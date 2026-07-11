import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Causey — Join the waitlist",
  description:
    "Connecting talent to opportunity. Discover competitions that match your skills, no matter where you live.",
  openGraph: {
    title: "Causey — Join the waitlist",
    description:
      "Stop searching scattered websites. Join the centralized platform built for students, parents, and coaches.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${space.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
