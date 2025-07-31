'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import QRCode from 'qrcode';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Input, Select, Textarea, Button } from '@/components/ui/FormField';
import Loading from '@/components/ui/Loading';
import { Download } from 'lucide-react';

const qrSchema = z.object({
  text: z.string().min(1, 'Text is required').max(2000, 'Text too long'),
  size: z.enum(['200', '300', '400', '500']),
  errorCorrection: z.enum(['L', 'M', 'Q', 'H']),
  type: z.enum(['text', 'url', 'email', 'phone', 'sms', 'wifi']),
});

type QRFormData = z.infer<typeof qrSchema>;

const QRCodeGenerator = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QRFormData>({
    resolver: zodResolver(qrSchema),
    defaultValues: {
      text: 'https://toolbank.vercel.app',
      size: '300',
      errorCorrection: 'M',
      type: 'url',
    },
  });

  const type = watch('type');

  const generateQRCode = async (data: QRFormData) => {
    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      await QRCode.toCanvas(canvas, data.text, {
        width: parseInt(data.size),
        errorCorrectionLevel: data.errorCorrection,
        margin: 2,
      });

      const dataUrl = canvas.toDataURL('image/png');
      setQrCodeUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = (data: QRFormData) => {
    generateQRCode(data);
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeUrl;
    link.click();
  };

  const handleTypeChange = (newType: string) => {
    setValue('type', newType as any);
    
    // Set example text based on type
    const examples = {
      text: 'Hello World!',
      url: 'https://toolbank.vercel.app',
      email: 'contact@example.com',
      phone: '+1234567890',
      sms: 'sms:+1234567890:Hello!',
      wifi: 'WIFI:T:WPA;S:NetworkName;P:Password;;',
    };
    
    setValue('text', examples[newType as keyof typeof examples] || '');
  };

  const relatedTools = [
    {
      name: 'Password Generator',
      href: '/password-generator',
      description: 'Generate secure passwords',
    },
    {
      name: 'JSON Formatter',
      href: '/json-formatter',
      description: 'Format and validate JSON data',
    },
    {
      name: 'HTML Minifier',
      href: '/html-minifier',
      description: 'Minify HTML code',
    },
  ];
  const typeOptions = [
    { value: 'text', label: 'Plain Text' },
    { value: 'url', label: 'Website URL' },
    { value: 'email', label: 'Email Address' },
    { value: 'phone', label: 'Phone Number' },
    { value: 'sms', label: 'SMS Message' },
    { value: 'wifi', label: 'WiFi Network' },
  ];

  const sizeOptions = [
    { value: '200', label: '200x200 px' },
    { value: '300', label: '300x300 px' },
    { value: '400', label: '400x400 px' },
    { value: '500', label: '500x500 px' },
  ];

  const errorCorrectionOptions = [
    { value: 'L', label: 'Low (~7%)' },
    { value: 'M', label: 'Medium (~15%)' },
    { value: 'Q', label: 'Quartile (~25%)' },
    { value: 'H', label: 'High (~30%)' },
  ];

  return (
    <ToolLayout
        title="QR Code Generator - Create QR Codes for URLs, WiFi & Text"
        description="Free QR code generator for URLs, WiFi passwords, contact info & text. Create custom QR codes with logos, colors & download high-quality PNG/SVG images instantly."
        slug="qr-code-generator"
        keywords={['QR code generator', 'WiFi QR code', 'URL QR code', 'contact QR code', 'QR code with logo', 'custom QR code', 'free QR generator']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">QR Code Generator</h1>
            <p className="text-lg text-gray-600">
              Create custom QR codes for URLs, text, email addresses, phone numbers, SMS messages, and WiFi networks. 
              Generate high-quality QR codes and download them instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Generator Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField label="QR Code Type" required>
                  <Select
                    value={type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    options={typeOptions}
                  />
                </FormField>

                <FormField 
                  label="Content" 
                  required
                  error={errors.text}
                  description={`Enter the ${type === 'url' ? 'URL' : type === 'email' ? 'email address' : 'content'} for your QR code`}
                >
                  {type === 'text' || type === 'sms' || type === 'wifi' ? (
                    <Textarea
                      rows={3}
                      {...register('text')}
                      error={!!errors.text}
                      placeholder="Enter your content here..."
                    />
                  ) : (
                    <Input
                      type={type === 'email' ? 'email' : type === 'url' ? 'url' : 'text'}
                      {...register('text')}
                      error={!!errors.text}
                      placeholder="Enter your content here..."
                    />
                  )}
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Size" required>
                    <Select
                      {...register('size')}
                      options={sizeOptions}
                    />
                  </FormField>

                  <FormField label="Error Correction" required>
                    <Select
                      {...register('errorCorrection')}
                      options={errorCorrectionOptions}
                    />
                  </FormField>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate QR Code'}
                </Button>
              </form>
            </div>

            {/* QR Code Display */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated QR Code</h3>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto"
                    style={{ display: qrCodeUrl ? 'block' : 'none' }}
                  />
                  {!qrCodeUrl && (
                    <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500 text-center">
                        QR code will appear here
                      </p>
                    </div>
                  )}
                </div>

                {qrCodeUrl && (
                  <Button
                    onClick={downloadQRCode}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PNG</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About QR Codes</h2>
            <p className="text-gray-600 mb-4">
              QR (Quick Response) codes are two-dimensional barcodes that can store various types of information. 
              They can be scanned by smartphones and other devices to quickly access the encoded data.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">QR Code Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">URL QR Codes</h4>
                <p className="text-blue-700">Direct users to websites or web pages</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Contact QR Codes</h4>
                <p className="text-green-700">Share email addresses or phone numbers</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">WiFi QR Codes</h4>
                <p className="text-yellow-700">Allow easy WiFi network connection</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900">Text QR Codes</h4>
                <p className="text-purple-700">Display plain text messages</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Error Correction Levels</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">
                <strong>Low (L):</strong> ~7% error correction - smallest QR code size
              </p>
              <p className="text-gray-600">
                <strong>Medium (M):</strong> ~15% error correction - balanced size and reliability
              </p>
              <p className="text-gray-600">
                <strong>Quartile (Q):</strong> ~25% error correction - good for damaged environments
              </p>
              <p className="text-gray-600">
                <strong>High (H):</strong> ~30% error correction - maximum reliability
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">How do I scan a QR code?</h4>
                <p className="text-gray-600">
                  Most smartphones have built-in QR code scanners in their camera apps. Simply point your camera 
                  at the QR code and tap the notification that appears.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">What's the maximum amount of data in a QR code?</h4>
                <p className="text-gray-600">
                  QR codes can store up to 4,296 alphanumeric characters, 7,089 numeric characters, 
                  or 2,953 bytes of binary data, depending on the error correction level.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Can QR codes expire?</h4>
                <p className="text-gray-600">
                  Static QR codes (like those generated here) don't expire. However, if the content they 
                  point to (like a website) becomes unavailable, the QR code won't work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default QRCodeGenerator;
