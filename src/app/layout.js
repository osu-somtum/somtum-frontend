import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from 'next';
import config from './config';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { brandImage, brandName, brandDescription } = config;

export const metadata = {
  title: brandName,
  description: brandDescription,
  openGraph: {
    title: brandName,
    description: brandDescription,
    image: { url: brandImage, alt: 'Logo' },
  },
};

export const viewport = {
  themeColor: "#7AB226",
};

export default function RootLayout({ children }) {
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

