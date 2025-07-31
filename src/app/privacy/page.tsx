import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | ToolBank',
  description: 'Privacy policy for ToolBank - Learn how we protect your data and privacy when using our free online tools and calculators.',
  robots: 'index, follow',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  ToolBank is committed to protecting your privacy. We collect minimal information to provide our services:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Usage Data:</strong> We collect anonymous analytics data about how you use our tools to improve our services.</li>
                  <li><strong>Technical Data:</strong> Basic technical information like IP address, browser type, and device information for security and optimization.</li>
                  <li><strong>Cookies:</strong> We use essential cookies for website functionality and analytics cookies to understand usage patterns.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We use collected information to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide and maintain our free online tools</li>
                  <li>Improve user experience and tool functionality</li>
                  <li>Analyze usage patterns to enhance our services</li>
                  <li>Ensure website security and prevent abuse</li>
                  <li>Display relevant advertisements through Google AdSense</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Processing and Storage</h2>
                <p className="text-gray-700 mb-4">
                  All calculations and data processing happen locally in your browser. We do not store or transmit:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Personal information entered into our calculators</li>
                  <li>Financial data from loan or tax calculators</li>
                  <li>Health information from BMI or calorie calculators</li>
                  <li>Generated passwords or QR codes</li>
                  <li>Any sensitive personal data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Services</h2>
                <p className="text-gray-700 mb-4">We use the following third-party services:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics and usage statistics</li>
                  <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                  <li><strong>Netlify:</strong> For website hosting and content delivery</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  These services have their own privacy policies and may collect data according to their terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
                <p className="text-gray-700 mb-4">We use cookies for:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Essential website functionality</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Advertising personalization (through Google AdSense)</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Access information about data we collect</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of analytics tracking</li>
                  <li>Control cookie preferences</li>
                  <li>Contact us with privacy concerns</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your information. Our website uses HTTPS encryption, 
                  and we follow industry best practices for data protection. However, no method of transmission over the 
                  internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p className="text-gray-700">
                  Our services are not directed to children under 13. We do not knowingly collect personal information 
                  from children under 13. If you believe we have collected information from a child under 13, please 
                  contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
                <p className="text-gray-700">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting 
                  the new privacy policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this privacy policy or our data practices, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@toolbank.com<br />
                    <strong>Website:</strong> https://toolbank.vercel.app
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
