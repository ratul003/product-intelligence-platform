import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://product-intelligence-platform.vercel.app"),
  title: "Product Intelligence Platform — Wahid Tawsif Ratul",
  description:
    "Case study: Building a warehouse-native product analytics platform from zero — Segment instrumentation, Snowflake, Mixpanel, and an in-house analytics platform across the product suite.",
  openGraph: {
    title: "Product Intelligence Platform",
    description:
      "From zero instrumentation to warehouse-native, ARR-linked analytics across the product suite.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Intelligence Platform",
    description:
      "From zero instrumentation to warehouse-native, ARR-linked analytics across the product suite.",
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
