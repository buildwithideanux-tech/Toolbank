'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Textarea, Button, Select } from '@/components/ui/FormField';
import { Copy, Download, Upload } from 'lucide-react';

const JSONFormatter = () => {
  const [formattedJson, setFormattedJson] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const { register, watch, setValue } = useForm({
    defaultValues: {
      input: '',
      indentSize: '2',
    },
  });

  const input = watch('input');
  const indentSize = watch('indentSize');

  const formatJSON = (jsonString: string, indent: number = 2) => {
    try {
      if (!jsonString.trim()) {
        setFormattedJson('');
        setError('');
        setIsValid(false);
        return;
      }

      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, indent);
      setFormattedJson(formatted);
      setError('');
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setFormattedJson('');
      setIsValid(false);
    }
  };

  const minifyJSON = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setFormattedJson(minified);
      setError('');
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  const validateJSON = () => {
    formatJSON(input, parseInt(indentSize));
  };

  const copyToClipboard = async () => {
    if (!formattedJson) return;
    
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const downloadJSON = () => {
    if (!formattedJson) return;
    
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadSampleJSON = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001"
      },
      "hobbies": ["reading", "swimming", "coding"],
      "isActive": true,
      "metadata": null
    };
    
    setValue('input', JSON.stringify(sample));
    formatJSON(JSON.stringify(sample), parseInt(indentSize));
  };

  const relatedTools = [
    {
      name: 'QR Code Generator',
      href: '/qr-code-generator',
      description: 'Generate QR codes for any text or URL',
    },
    {
      name: 'Password Generator',
      href: '/password-generator',
      description: 'Generate secure passwords',
    },
    {
      name: 'HTML Minifier',
      href: '/html-minifier',
      description: 'Minify HTML code',
    },
  ];
  const indentOptions = [
    { value: '2', label: '2 spaces' },
    { value: '4', label: '4 spaces' },
    { value: '8', label: '8 spaces' },
  ];

  return (
    <ToolLayout
        title="JSON Formatter - Validate, Format & Minify JSON Online"
        description="Free JSON formatter and validator to format, validate, and minify JSON data. Clean up messy JSON with proper indentation and error detection."
        slug="json-formatter"
        keywords={['JSON formatter', 'JSON validator', 'JSON minifier', 'format JSON', 'validate JSON']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">JSON Formatter</h1>
            <p className="text-lg text-gray-600">
              Format, validate, and minify JSON data. Clean up messy JSON with proper indentation, 
              validate syntax, and detect errors instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Input JSON</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={loadSampleJSON}
                  >
                    Load Sample
                  </Button>
                </div>

                <FormField label="JSON Data">
                  <Textarea
                    {...register('input')}
                    rows={15}
                    placeholder="Paste your JSON here..."
                    className="font-mono text-sm"
                  />
                </FormField>

                <div className="mt-4 flex flex-wrap gap-3">
                  <FormField label="Indent Size">
                    <Select
                      {...register('indentSize')}
                      options={indentOptions}
                    />
                  </FormField>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={validateJSON}
                    disabled={!input.trim()}
                  >
                    Format JSON
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={minifyJSON}
                    disabled={!input.trim()}
                  >
                    Minify JSON
                  </Button>
                </div>
              </div>

              {/* Status */}
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    error ? 'bg-red-500' : isValid ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-sm font-medium">
                    {error ? 'Invalid JSON' : isValid ? 'Valid JSON' : 'No JSON to validate'}
                  </span>
                </div>
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Formatted JSON</h3>
                  <div className="flex space-x-2">
                    {formattedJson && (
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
                          onClick={downloadJSON}
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
                  {formattedJson ? (
                    <pre className="p-4 text-sm font-mono overflow-auto max-h-96 whitespace-pre-wrap">
                      {formattedJson}
                    </pre>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      Formatted JSON will appear here
                    </div>
                  )}
                </div>
              </div>

              {/* JSON Info */}
              {isValid && formattedJson && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">JSON Statistics</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>Characters: {formattedJson.length.toLocaleString()}</div>
                    <div>Lines: {formattedJson.split('\n').length.toLocaleString()}</div>
                    <div>Size: {new Blob([formattedJson]).size} bytes</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About JSON</h2>
            <p className="text-gray-600 mb-4">
              JSON (JavaScript Object Notation) is a lightweight data-interchange format. 
              It's easy for humans to read and write, and easy for machines to parse and generate.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">JSON Syntax Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Data Types</h4>
                <ul className="text-blue-700 text-sm mt-2 space-y-1">
                  <li>• String: "text"</li>
                  <li>• Number: 123, 45.67</li>
                  <li>• Boolean: true, false</li>
                  <li>• null: null</li>
                  <li>• Object: {`{"key": "value"}`}</li>
                  <li>• Array: [1, 2, 3]</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Syntax Rules</h4>
                <ul className="text-green-700 text-sm mt-2 space-y-1">
                  <li>• Strings must use double quotes</li>
                  <li>• No trailing commas allowed</li>
                  <li>• No comments allowed</li>
                  <li>• Keys must be strings</li>
                  <li>• No undefined values</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Common JSON Errors</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-red-50 p-3 rounded">
                <strong>Single Quotes:</strong> Use double quotes for strings, not single quotes
              </div>
              <div className="bg-red-50 p-3 rounded">
                <strong>Trailing Commas:</strong> Remove commas after the last item in objects/arrays
              </div>
              <div className="bg-red-50 p-3 rounded">
                <strong>Unquoted Keys:</strong> Object keys must be enclosed in double quotes
              </div>
              <div className="bg-red-50 p-3 rounded">
                <strong>Comments:</strong> JSON doesn't support comments (// or /* */)
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">What's the difference between JSON and JavaScript objects?</h4>
                <p className="text-gray-600">
                  JSON is a text format that follows JavaScript object syntax but is stricter. 
                  JSON requires double quotes for strings and doesn't allow functions, comments, or undefined values.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">How do I fix "Unexpected token" errors?</h4>
                <p className="text-gray-600">
                  Check for missing commas, extra commas, unmatched brackets, single quotes instead of double quotes, 
                  or invalid characters in your JSON.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Can I include functions in JSON?</h4>
                <p className="text-gray-600">
                  No, JSON only supports data types: strings, numbers, booleans, null, objects, and arrays. 
                  Functions, dates, and undefined values are not valid JSON.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default JSONFormatter;
