import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, MessageSquare, Bug, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | ToolBank',
  description: 'Get in touch with ToolBank team. Report bugs, suggest features, or ask questions about our free online tools and calculators.',
  robots: 'index, follow',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions, suggestions, or found a bug? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">General Inquiries</h3>
                    <p className="text-gray-600 mt-1">
                      For general questions about our tools and services
                    </p>
                    <a 
                      href="mailto:contact@toolbank.com" 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      contact@toolbank.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Bug className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Bug Reports</h3>
                    <p className="text-gray-600 mt-1">
                      Found a bug or issue with one of our tools?
                    </p>
                    <a 
                      href="mailto:bugs@toolbank.com" 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      bugs@toolbank.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Lightbulb className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Feature Requests</h3>
                    <p className="text-gray-600 mt-1">
                      Have an idea for a new tool or feature?
                    </p>
                    <a 
                      href="mailto:features@toolbank.com" 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      features@toolbank.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Feedback</h3>
                    <p className="text-gray-600 mt-1">
                      Share your thoughts and suggestions
                    </p>
                    <a 
                      href="mailto:feedback@toolbank.com" 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      feedback@toolbank.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Are all tools really free?
                  </h3>
                  <p className="text-gray-600">
                    Yes! All our tools are completely free to use with no registration required. 
                    We support the service through non-intrusive advertisements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do you store my data?
                  </h3>
                  <p className="text-gray-600">
                    No, we don't store any personal data you enter into our calculators. 
                    All calculations happen locally in your browser for your privacy and security.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I suggest a new tool?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely! We're always looking to add useful tools. Send your suggestions 
                    to features@toolbank.com and we'll consider them for future updates.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How accurate are the calculations?
                  </h3>
                  <p className="text-gray-600">
                    Our tools use industry-standard formulas and are thoroughly tested. However, 
                    they're for informational purposes only and shouldn't replace professional advice.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do you have a mobile app?
                  </h3>
                  <p className="text-gray-600">
                    Currently, we're web-based only, but our tools are fully responsive and work 
                    great on mobile devices. A mobile app may be considered in the future.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time Notice */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Response Time</h3>
            <p className="text-blue-700">
              We typically respond to emails within 24-48 hours during business days. 
              For urgent issues, please mark your email as "Urgent" in the subject line.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
