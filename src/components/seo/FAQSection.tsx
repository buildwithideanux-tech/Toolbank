import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  toolName: string;
}

const FAQSection = ({ faqs, title = "Frequently Asked Questions", toolName }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ structured data
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <section className="mt-12">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />

      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 pb-4"
                >
                  <div className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

// Predefined FAQ sets for different tools
export const toolFAQs: Record<string, FAQ[]> = {
  'bmi-calculator': [
    {
      question: 'What is BMI and how is it calculated?',
      answer: 'BMI (Body Mass Index) is a measure of body fat based on height and weight. It\'s calculated by dividing weight in kilograms by height in meters squared (kg/m²). For imperial units, the formula is (weight in pounds / height in inches²) × 703.'
    },
    {
      question: 'What are the BMI categories and ranges?',
      answer: 'BMI categories are: Underweight (below 18.5), Normal weight (18.5-24.9), Overweight (25-29.9), and Obese (30 and above). These ranges help assess health risks associated with weight.'
    },
    {
      question: 'Is BMI accurate for everyone?',
      answer: 'BMI is a useful screening tool but has limitations. It doesn\'t distinguish between muscle and fat mass, so athletes or very muscular individuals may have high BMI despite being healthy. It\'s also less accurate for elderly people and certain ethnic groups.'
    },
    {
      question: 'How often should I check my BMI?',
      answer: 'For general health monitoring, checking BMI monthly or quarterly is sufficient. If you\'re actively trying to lose or gain weight, weekly checks can help track progress. Always consult healthcare professionals for personalized advice.'
    },
    {
      question: 'Can I use this BMI calculator for children?',
      answer: 'This calculator is designed for adults (18+ years). Children and teens require age and gender-specific BMI percentiles. Consult a pediatrician for accurate BMI assessment in children.'
    }
  ],
  'loan-calculator': [
    {
      question: 'How do loan calculators work?',
      answer: 'Loan calculators use the loan amount, interest rate, and loan term to calculate monthly payments using the standard amortization formula. They show how much you\'ll pay monthly and the total interest over the loan\'s life.'
    },
    {
      question: 'What\'s the difference between APR and interest rate?',
      answer: 'Interest rate is the cost of borrowing the principal amount. APR (Annual Percentage Rate) includes the interest rate plus additional fees and costs, giving you the true cost of the loan annually.'
    },
    {
      question: 'Should I choose a longer or shorter loan term?',
      answer: 'Shorter terms mean higher monthly payments but less total interest paid. Longer terms have lower monthly payments but more total interest. Choose based on your budget and financial goals.'
    },
    {
      question: 'How does my credit score affect loan terms?',
      answer: 'Higher credit scores typically qualify for lower interest rates, saving thousands over the loan term. Scores above 740 usually get the best rates, while scores below 620 may face higher rates or require co-signers.'
    },
    {
      question: 'Can I pay off my loan early?',
      answer: 'Most loans allow early payoff, which can save significant interest. However, some loans have prepayment penalties. Check your loan terms and use our calculator to see potential savings from extra payments.'
    }
  ],
  'password-generator': [
    {
      question: 'What makes a password strong and secure?',
      answer: 'Strong passwords are at least 12 characters long, include uppercase and lowercase letters, numbers, and special characters. They should be unique for each account and not contain personal information or common words.'
    },
    {
      question: 'How often should I change my passwords?',
      answer: 'Change passwords immediately if there\'s a security breach. For regular accounts, changing every 3-6 months is good practice. However, using unique, strong passwords with two-factor authentication is more important than frequent changes.'
    },
    {
      question: 'Is it safe to use online password generators?',
      answer: 'Reputable password generators that run in your browser (client-side) are generally safe. Our generator creates passwords locally without sending them to servers. Always use generators from trusted sources.'
    },
    {
      question: 'Should I use a password manager?',
      answer: 'Yes! Password managers generate, store, and auto-fill unique passwords for all accounts. They\'re much safer than reusing passwords or writing them down. Popular options include 1Password, Bitwarden, and LastPass.'
    },
    {
      question: 'What should I avoid in passwords?',
      answer: 'Avoid personal information (names, birthdays), common words, sequential characters (123, abc), and reusing passwords across accounts. Don\'t use passwords shorter than 8 characters or those found in data breaches.'
    }
  ]
};
