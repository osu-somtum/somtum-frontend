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

const { logoLink } = config;

export const metadata = {

  title: "osu!somtum",
  description: "osu!somtum - Private osu! Server!",
  image: {logoLink},
  openGraph: {
    title: 'osu!somtum',
    description: "osu!somtum - Private osu! Server!",
    image: {logoLink},
  }
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

