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
  title: 'ReVis Gallery — Reference vs. Reconstructed',
  description: 'Side-by-side results from the ReVis image-based visualization reproduction study.',
  openGraph: {
    title: 'ReVis Gallery — Reference vs. Reconstructed',
    description: 'Explore 20 side-by-side reconstruction results from the ReVis study.',
    images: ['https://raw.githubusercontent.com/Selvalim/ReVis/main/gallery/public/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReVis Gallery — Reference vs. Reconstructed',
    description: 'Explore 20 side-by-side reconstruction results from the ReVis study.',
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
