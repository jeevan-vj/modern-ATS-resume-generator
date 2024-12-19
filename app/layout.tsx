import type { Metadata } from "next";

// ...existing code...

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Modern ATS Resume Generator',
    template: '%s | Modern ATS Resume Generator'
  },
  description: 'Create ATS-friendly resumes that help you land your dream job. Free, modern resume generator optimized for applicant tracking systems.',
  keywords: ['resume generator', 'ATS resume', 'CV maker', 'job application', 'career tools'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Modern ATS Resume Generator',
    description: 'Create ATS-friendly resumes that help you land your dream job',
    siteName: 'Modern ATS Resume Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Modern ATS Resume Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern ATS Resume Generator',
    description: 'Create ATS-friendly resumes that help you land your dream job',
    images: ['/og-image.png']
  },
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

// ...rest of the existing code...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1 w-full flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
