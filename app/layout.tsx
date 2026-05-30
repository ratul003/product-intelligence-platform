import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Product Intelligence Platform — Wahid Tawsif Ratul",
  description:
    "Case study: Building a warehouse-native product analytics platform from zero — Segment instrumentation, Snowflake, Mixpanel, and Optimizely Analytics across 8 SaaS products.",
  openGraph: {
    title: "Product Intelligence Platform",
    description:
      "From zero instrumentation to warehouse-native analytics across 8 SaaS products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
