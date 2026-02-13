import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { EVENT_INFO } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: `${EVENT_INFO.name} | Medical Tourism Exhibition`,
    template: `%s | ${EVENT_INFO.shortName}`,
  },
  description: `Join the premier healthcare and medical tourism exhibition in the Balkans. ${EVENT_INFO.date} at ${EVENT_INFO.location}. Connect with leading healthcare providers and explore medical tourism opportunities.`,
  keywords: [
    'medical tourism',
    'healthcare expo',
    'Bosnia healthcare',
    'medical tourism exhibition',
    'health tourism Balkans',
    'healthcare conference',
    'medical travel',
    'dental tourism',
    'aesthetic surgery',
    'health checkup abroad',
  ],
  authors: [{ name: EVENT_INFO.organizer }],
  creator: EVENT_INFO.organizer,
  publisher: EVENT_INFO.organizer,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: EVENT_INFO.website,
    siteName: EVENT_INFO.shortName,
    title: EVENT_INFO.name,
    description: `Join the premier healthcare and medical tourism exhibition in the Balkans. ${EVENT_INFO.date}`,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: EVENT_INFO.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: EVENT_INFO.name,
    description: `Join the premier healthcare and medical tourism exhibition in the Balkans. ${EVENT_INFO.date}`,
    images: ['/images/og-image.jpg'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
