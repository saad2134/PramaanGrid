import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PramaanGrid (प्रमाण-ग्रिड) - Anti-Fraud Proof-of-Clearance Protocol",
  description: "The algorithmic Proof-of-Clearance and civic trust protocol for Indian municipal waste management and infrastructure.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "PramaanGrid (प्रमाण-ग्रिड) - Anti-Fraud Proof-of-Clearance Protocol",
    description: "The algorithmic Proof-of-Clearance and civic trust protocol for Indian municipal waste management and infrastructure.",
    url: "https://pramaangrid.org",
    siteName: "PramaanGrid",
    images: [
      {
        url: "/social-preview.png",
        width: 640,
        height: 320,
        alt: "PramaanGrid - Municipal Civic Escrow & Anti-Fraud Grid",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PramaanGrid (प्रमाण-ग्रिड)",
    description: "Algorithmic Proof-of-Clearance & Anti-Fraud Escrow Protocol for Urban Municipalities.",
    images: ["/social-preview.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
