import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://formfit.in'),
  title: {
    default: 'FormFit India — Free Client-Side Exam Photo, Signature & Document Resizer',
    template: '%s | FormFit India',
  },
  description:
    'Resize photos and signatures for UPSC, SSC, IBPS, SBI, RRB, NEET, JEE, PAN Card, and Indian Passport online for free. 100% private in-browser tool with exact DPI header injection, minimum KB floor guarantee, and Name/Date slates.',
  keywords: [
    'exam photo resizer india',
    'upsc photo resizer',
    'ssc signature resizer 10kb to 20kb',
    'ibps photo 200x230 converter',
    'neet photo with name and date',
    'pan card photo 200 dpi resizer',
    'photo and signature compressor in kb',
    'photo resizer under 50kb',
  ],
  authors: [{ name: 'FormFit India Technical Engineering Team' }],
  creator: 'FormFit India',
  publisher: 'FormFit India',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://formfit.in',
    siteName: 'FormFit India',
    title: 'FormFit India — Free Exam Photo & Signature Compliance Engine',
    description:
      'Exact KB window guarantee (10–20 KB, 20–50 KB), 200/300 DPI binary injection, and Name/Date slates for all Indian government and entrance exams. 100% on-device.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormFit India — Free Exam Photo & Signature Compliance Engine',
    description:
      'Zero-upload, in-browser photo and signature resizer for UPSC, SSC, IBPS, NEET, JEE, and Government ID cards.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 antialiased">
        {/* Skip to main content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 px-4 py-2 bg-blue-700 text-white font-semibold rounded-md shadow-lg outline-none"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1 w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
