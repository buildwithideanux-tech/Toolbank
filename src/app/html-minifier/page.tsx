'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Textarea, Button } from '@/components/ui/FormField';
import Loading from '@/components/ui/Loading';
import { Copy, Download, Upload } from 'lucide-react';

const HTMLMinifier = () => {
  const [minifiedHtml, setMinifiedHtml] = useState<string>('');
  const [isMinifying, setIsMinifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{
    originalSize: number;
    minifiedSize: number;
    savings: number;
    savingsPercent: number;
  } | null>(null);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      input: '',
      removeComments: true,
      removeWhitespace: true,
      removeEmptyAttributes: true,
      collapseWhitespace: true,
    },
  });

  const input = watch('input');
  const options = {
    removeComments: watch('removeComments'),
    removeWhitespace: watch('removeWhitespace'),
    removeEmptyAttributes: watch('removeEmptyAttributes'),
    collapseWhitespace: watch('collapseWhitespace'),
  };

  const minifyHTML = async (htmlString: string, options: any) => {
    setIsMinifying(true);
    
    try {
      let minified = htmlString;

      // Remove HTML comments
      if (options.removeComments) {
        minified = minified.replace(/<!--[\s\S]*?-->/g, '');
      }

      // Remove unnecessary whitespace
      if (options.removeWhitespace) {
        minified = minified.replace(/\s+/g, ' ');
      }

      // Collapse whitespace between tags
      if (options.collapseWhitespace) {
        minified = minified.replace(/>\s+</g, '><');
      }

      // Remove empty attributes
      if (options.removeEmptyAttributes) {
        minified = minified.replace(/\s+[a-zA-Z-]+=""\s*/g, ' ');
      }

      // Remove leading/trailing whitespace
      minified = minified.trim();

      // Calculate stats
      const originalSize = new Blob([htmlString]).size;
      const minifiedSize = new Blob([minified]).size;
      const savings = originalSize - minifiedSize;
      const savingsPercent = originalSize > 0 ? (savings / originalSize) * 100 : 0;

      setMinifiedHtml(minified);
      setStats({
        originalSize,
        minifiedSize,
        savings,
        savingsPercent,
      });
    } catch (error) {
      console.error('Error minifying HTML:', error);
    } finally {
      setIsMinifying(false);
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    minifyHTML(input, options);
  };

  const copyToClipboard = async () => {
    if (!minifiedHtml) return;
    
    try {
      await navigator.clipboard.writeText(minifiedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const downloadHTML = () => {
    if (!minifiedHtml) return;
    
    const blob = new Blob([minifiedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minified.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadSampleHTML = () => {
    const sample = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample HTML Document</title>
    <!-- This is a comment -->
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is the home section with some content.</p>
        </section>
        
        <section id="about">
            <h2>About Section</h2>
            <p>Learn more about us in this section.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>`;
    
    setValue('input', sample);
  };

  const relatedTools = [
    {
      name: 'JSON Formatter',
      href: '/json-formatter',
      description: 'Format and validate JSON data',
    },
    {
      name: 'CSS Minifier',
      href: '/css-minifier',
      description: 'Minify CSS code',
    },
    {
      name: 'JavaScript Minifier',
      href: '/js-minifier',
      description: 'Minify JavaScript code',
    },
  ];

  return (
    <ToolLayout
      title="HTML Minifier - Compress HTML Code Online"
      description="Free HTML minifier to compress and optimize HTML code. Remove comments, whitespace, and unnecessary characters to reduce file size."
      slug="html-minifier"
      keywords={['HTML minifier', 'compress HTML', 'HTML optimizer', 'minify HTML', 'HTML compression']}
      relatedTools={relatedTools}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">HTML Minifier</h1>
          <p className="text-lg text-gray-600">
            Compress and optimize your HTML code by removing unnecessary whitespace, comments, 
            and empty attributes. Reduce file size for faster loading websites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Input HTML</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={loadSampleHTML}
                >
                  Load Sample
                </Button>
              </div>

              <FormField label="HTML Code">
                <Textarea
                  {...register('input')}
                  rows={15}
                  placeholder="Paste your HTML code here..."
                  className="font-mono text-sm"
                />
              </FormField>

              <div className="mt-4 space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Minification Options</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('removeComments')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remove HTML comments</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('collapseWhitespace')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Collapse whitespace</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('removeEmptyAttributes')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remove empty attributes</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  type="button"
                  onClick={handleMinify}
                  disabled={!input.trim() || isMinifying}
                  className="w-full"
                >
                  {isMinifying ? <Loading size="sm" text="Minifying..." /> : 'Minify HTML'}
                </Button>
              </div>
            </div>

            {/* Stats */}
            {stats && (
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">Compression Results</h4>
                <div className="space-y-1 text-sm text-green-700">
                  <div className="flex justify-between">
                    <span>Original Size:</span>
                    <span>{stats.originalSize.toLocaleString()} bytes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minified Size:</span>
                    <span>{stats.minifiedSize.toLocaleString()} bytes</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Savings:</span>
                    <span>{stats.savings.toLocaleString()} bytes ({stats.savingsPercent.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Minified HTML</h3>
                <div className="flex space-x-2">
                  {minifiedHtml && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="flex items-center space-x-1"
                      >
                        <Copy className="h-4 w-4" />
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={downloadHTML}
                        className="flex items-center space-x-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white rounded border">
                {minifiedHtml ? (
                  <pre className="p-4 text-sm font-mono overflow-auto max-h-96 whitespace-pre-wrap">
                    {minifiedHtml}
                  </pre>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Minified HTML will appear here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About HTML Minification</h2>
          <p className="text-gray-600 mb-4">
            HTML minification removes unnecessary characters from HTML code without changing its functionality. 
            This reduces file size and improves website loading speed.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefits of HTML Minification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900">Faster Loading</h4>
              <p className="text-blue-700">Smaller files load faster, improving user experience</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900">Reduced Bandwidth</h4>
              <p className="text-green-700">Less data transfer saves bandwidth costs</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900">Better SEO</h4>
              <p className="text-yellow-700">Faster sites rank better in search engines</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900">Improved Performance</h4>
              <p className="text-purple-700">Reduced parsing time for browsers</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">What Gets Removed</h3>
          <div className="space-y-3 mb-6">
            <div className="bg-red-50 p-3 rounded">
              <strong>Comments:</strong> HTML comments (&lt;!-- --&gt;) that are not needed in production
            </div>
            <div className="bg-red-50 p-3 rounded">
              <strong>Whitespace:</strong> Unnecessary spaces, tabs, and line breaks
            </div>
            <div className="bg-red-50 p-3 rounded">
              <strong>Empty Attributes:</strong> Attributes with empty values
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Will minification break my HTML?</h4>
              <p className="text-gray-600">
                No, proper minification only removes unnecessary characters while preserving functionality. 
                However, always test minified code before deploying to production.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Should I minify HTML for production?</h4>
              <p className="text-gray-600">
                Yes, minifying HTML is a best practice for production websites. It reduces file size 
                and improves loading speed without affecting functionality.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Can I minify inline CSS and JavaScript?</h4>
              <p className="text-gray-600">
                This tool focuses on HTML structure. For CSS and JavaScript minification, 
                use dedicated tools that can properly handle their syntax and optimization rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default HTMLMinifier;
