import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from '@/components/providers/LoadingProvider';
import AnalyticsProvider from '@/components/providers/AnalyticsProvider';
import TopLoadingBar from '@/components/ui/TopLoadingBar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://toolbank.vercel.app'),
  title: {
    default: "ToolBank - Free Online Tools & Calculators",
    template: "%s | ToolBank"
  },
  description: "18+ free online tools: Invoice generator, unit converter, BMI calculator, tip calculator, password generator, QR codes, loan calculator & more. No registration required.",
  keywords: ["online tools", "calculators", "BMI calculator", "loan calculator", "QR code generator", "free tools", "password generator", "JSON formatter", "word counter"],
  authors: [{ name: "ToolBank" }],
  creator: "ToolBank",
  publisher: "ToolBank",
  robots: "index, follow",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolbank.vercel.app",
    siteName: "ToolBank",
    title: "ToolBank - Free Online Tools & Calculators",
    description: "Access 18+ free online tools and calculators for health, finance, development, and daily utilities.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ToolBank - Free Online Tools & Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolBank - Free Online Tools & Calculators",
    description: "Access 18+ free online tools and calculators for health, finance, development, and daily utilities.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
        <link rel="canonical" href="https://toolbank.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        <AnalyticsProvider>
          <LoadingProvider>
            <TopLoadingBar />
            {children}
          </LoadingProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
