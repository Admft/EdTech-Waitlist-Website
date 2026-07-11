import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Causey — Opportunity shouldn't depend on who you know",
  description:
    "Causey helps every student discover competitions that match their talent — no matter where they live or who they know.",
  openGraph: {
    title: "Causey — Opportunity shouldn't depend on who you know",
    description:
      "Causey helps every student discover competitions that match their talent — no matter where they live or who they know.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
