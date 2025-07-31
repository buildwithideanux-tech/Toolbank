'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ToolLayout from '@/components/layout/ToolLayout';
import FormField, { Textarea, Button } from '@/components/ui/FormField';
import ResultBlock from '@/components/ui/ResultBlock';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
}

const WordCounter = () => {
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  const { register, watch } = useForm({
    defaultValues: {
      text: '',
    },
  });

  const text = watch('text');

  const calculateStats = (inputText: string): TextStats => {
    if (!inputText.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
      };
    }

    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // Count words (split by whitespace and filter empty strings)
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Count sentences (split by sentence endings)
    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    
    // Count paragraphs (split by double line breaks)
    const paragraphs = inputText.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length;
    
    // Calculate reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    
    // Calculate speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(words / 150);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    };
  };

  useEffect(() => {
    const newStats = calculateStats(text);
    setStats(newStats);
  }, [text]);

  const clearText = () => {
    // This will be handled by react-hook-form
  };

  const relatedTools = [
    {
      name: 'Text Case Converter',
      href: '/text-case-converter',
      description: 'Convert text between different cases',
    },
    {
      name: 'Lorem Ipsum Generator',
      href: '/lorem-ipsum-generator',
      description: 'Generate placeholder text',
    },
    {
      name: 'Markdown Editor',
      href: '/markdown-editor',
      description: 'Edit and preview Markdown text',
    },
  ];
  return (
    <ToolLayout
        title="Word Counter - Count Words, Characters & Reading Time"
        description="Free word counter to count words, characters, sentences & paragraphs. Calculate reading time, speaking time & text statistics for essays, articles & documents."
        slug="word-counter"
        keywords={['word counter', 'character counter', 'reading time calculator', 'text statistics', 'essay word count', 'document word counter', 'paragraph counter']}
        relatedTools={relatedTools}
      >
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Word Counter</h1>
            <p className="text-lg text-gray-600">
              Count words, characters, sentences, and paragraphs in your text. Get detailed statistics 
              including reading time and speaking time estimates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Text Input */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-6">
                <FormField 
                  label="Enter your text" 
                  description="Type or paste your text here to get instant statistics"
                >
                  <Textarea
                    {...register('text')}
                    rows={15}
                    placeholder="Start typing or paste your text here..."
                    className="resize-none"
                  />
                </FormField>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Live counting as you type
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                      if (textarea) {
                        textarea.value = '';
                        textarea.dispatchEvent(new Event('input', { bubbles: true }));
                      }
                    }}
                  >
                    Clear Text
                  </Button>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-6">
              <ResultBlock
                title="Text Statistics"
                type="info"
                results={[
                  {
                    label: 'Words',
                    value: stats.words.toLocaleString(),
                  },
                  {
                    label: 'Characters',
                    value: stats.characters.toLocaleString(),
                  },
                  {
                    label: 'Characters (no spaces)',
                    value: stats.charactersNoSpaces.toLocaleString(),
                  },
                  {
                    label: 'Sentences',
                    value: stats.sentences.toLocaleString(),
                  },
                  {
                    label: 'Paragraphs',
                    value: stats.paragraphs.toLocaleString(),
                  },
                ]}
              />

              <ResultBlock
                title="Reading & Speaking Time"
                type="success"
                results={[
                  {
                    label: 'Reading Time',
                    value: stats.readingTime,
                    unit: stats.readingTime === 1 ? 'minute' : 'minutes',
                    description: 'Average reading speed: 200 WPM',
                  },
                  {
                    label: 'Speaking Time',
                    value: stats.speakingTime,
                    unit: stats.speakingTime === 1 ? 'minute' : 'minutes',
                    description: 'Average speaking speed: 150 WPM',
                  },
                ]}
              />
            </div>
          </div>

          {/* Information Section */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Word Counting</h2>
            <p className="text-gray-600 mb-4">
              Word counting is essential for writers, students, and professionals who need to meet specific 
              length requirements. This tool provides comprehensive text statistics to help you understand 
              and optimize your content.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Academic Writing</h4>
                <p className="text-blue-700">Essays, research papers, and thesis requirements</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Content Creation</h4>
                <p className="text-green-700">Blog posts, articles, and social media content</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">Professional Writing</h4>
                <p className="text-yellow-700">Reports, proposals, and business documents</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900">SEO Optimization</h4>
                <p className="text-purple-700">Meta descriptions, title tags, and content length</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Reading & Speaking Time Calculations</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 p-3 rounded">
                <strong>Reading Time:</strong> Based on average reading speed of 200 words per minute for adults
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Speaking Time:</strong> Based on average speaking speed of 150 words per minute for presentations
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Writing Guidelines</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600">
                <strong>Blog Posts:</strong> 1,500-2,500 words for comprehensive coverage
              </p>
              <p className="text-gray-600">
                <strong>Social Media:</strong> Twitter (280 chars), Facebook (40-80 chars for posts)
              </p>
              <p className="text-gray-600">
                <strong>Meta Descriptions:</strong> 150-160 characters for optimal SEO
              </p>
              <p className="text-gray-600">
                <strong>Email Subject Lines:</strong> 30-50 characters for mobile optimization
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">How accurate is the word count?</h4>
                <p className="text-gray-600">
                  Our word counter uses standard algorithms that split text by whitespace and filter empty strings. 
                  This method is consistent with most word processors and writing tools.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">What counts as a sentence?</h4>
                <p className="text-gray-600">
                  Sentences are counted by splitting text at sentence-ending punctuation (periods, exclamation marks, 
                  question marks). Empty sentences are filtered out.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">How is reading time calculated?</h4>
                <p className="text-gray-600">
                  Reading time is based on the average adult reading speed of 200 words per minute. This can vary 
                  based on text complexity and individual reading skills.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Is my text stored or saved?</h4>
                <p className="text-gray-600">
                  No, all text processing happens locally in your browser. Your text is not sent to any server 
                  or stored anywhere. It's completely private and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
  );
};

export default WordCounter;
