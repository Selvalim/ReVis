import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ReVis Gallery — Reference Distribution Recovery',
  description: 'Side-by-side reference images and saved GPT-5.4 distribution recovery results from ReVis.',
  openGraph: {
    title: 'ReVis Gallery — Reference Distribution Recovery',
    description: 'Explore 32 saved reference-based distribution recovery results from ReVis.',
    images: ['https://raw.githubusercontent.com/Selvalim/ReVis/main/gallery/public/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReVis Gallery — Reference Distribution Recovery',
    description: 'Explore 32 saved reference-based distribution recovery results from ReVis.',
    images: ['https://raw.githubusercontent.com/Selvalim/ReVis/main/gallery/public/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
