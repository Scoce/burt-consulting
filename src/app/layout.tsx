import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://burtconsulting.com"),
  title: {
    default: "James Burt | Technologist & Music Lover",
    template: "%s | James Burt",
  },
  description: "Personal portfolio website of James Burt. 17-year tech industry veteran, woodwind educator, and software builder based in San Antonio, TX.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "James Burt Portfolio",
    title: "James Burt | Technologist & Music Lover",
    description: "17-year B2B tech industry veteran, solutions engineering leader, and musician building software products.",
    url: "https://burtconsulting.com",
    locale: "en_US",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "James Burt - Technologist & Music Lover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "James Burt | Technologist & Music Lover",
    description: "17-year B2B tech industry veteran, solutions engineering leader, and musician building software products.",
    images: ["/og-cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#070913",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-blue text-slate-100 selection:bg-sax-gold/30 selection:text-white">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
