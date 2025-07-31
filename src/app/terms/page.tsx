import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | ToolBank',
  description: 'Terms of service for ToolBank - Read our terms and conditions for using our free online tools and calculators.',
  robots: 'index, follow',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing and using ToolBank ("we," "our," or "us"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  ToolBank provides free online tools and calculators including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Health calculators (BMI, calorie, water intake, TDEE)</li>
                  <li>Financial calculators (loan, tax, interest, tip)</li>
                  <li>Developer tools (QR code generator, password generator, JSON formatter)</li>
                  <li>Utility tools (unit converter, word counter, time zone converter)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use License</h2>
                <p className="text-gray-700 mb-4">
                  Permission is granted to temporarily use ToolBank for personal, non-commercial transitory viewing only. 
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Disclaimer</h2>
                <p className="text-gray-700 mb-4">
                  The information and tools provided by ToolBank are for general informational purposes only. While we 
                  strive for accuracy, we make no warranties about:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The accuracy, reliability, or completeness of calculations</li>
                  <li>The suitability of results for your specific needs</li>
                  <li>The availability or uninterrupted access to our services</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  <strong>Important:</strong> Our calculators are not substitutes for professional advice. Always consult 
                  qualified professionals for financial, health, or legal decisions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitations</h2>
                <p className="text-gray-700">
                  In no event shall ToolBank or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                  to use the materials on ToolBank's website, even if ToolBank or an authorized representative has been 
                  notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Accuracy of Materials</h2>
                <p className="text-gray-700">
                  The materials appearing on ToolBank's website could include technical, typographical, or photographic 
                  errors. ToolBank does not warrant that any of the materials on its website are accurate, complete, or 
                  current. ToolBank may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. User Conduct</h2>
                <p className="text-gray-700 mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use our services for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Use automated systems to access our tools excessively</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy</h2>
                <p className="text-gray-700">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of 
                  the service, to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
                <p className="text-gray-700">
                  ToolBank may revise these terms of service at any time without notice. By using this website, you are 
                  agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
                <p className="text-gray-700">
                  These terms and conditions are governed by and construed in accordance with the laws of the United States 
                  and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@toolbank.com<br />
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
