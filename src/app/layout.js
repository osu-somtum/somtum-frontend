import { Geist, Geist_Mono } from "next/font/google";
import { Mali } from 'next/font/google';
import "./globals.css";
import config from './config';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const MaliFont = Mali({
  variable: "--font-mali",
  weight: "500",
  subsets: ["latin"],
});

const { brandImage, brandName, brandDescription, mainUrl } = config;
export const metadata = {
  metadataBase: new URL(mainUrl),
  title: brandName,
  description: brandDescription,
  openGraph: {
    type: "website",
    url: mainUrl,
    title: brandName,
    description: brandDescription,
    images: [
      {
        url: '/static/images/somtum.png',
        alt: "Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: mainUrl,
    title: brandName,
    description: brandDescription,
    images: [
      {
        url: '/static/images/somtum.png',
        alt: "Logo",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#7AB226",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${MaliFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
