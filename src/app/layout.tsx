import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://causey-waitlist.vercel.app"),
  title: "Causey — Connecting talent to opportunity",
  description:
    "A central platform for competitions so any student with passion can build a clear path to the next level — no matter their zip code or school.",
  openGraph: {
    title: "Causey — Connecting talent to opportunity",
    description:
      "A central platform for competitions so any student with passion can build a clear path to the next level.",
    type: "website",
    url: "https://causey-waitlist.vercel.app",
    siteName: "Causey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Causey — Connecting talent to opportunity",
    description:
      "A central platform for competitions so any student with passion can build a clear path to the next level.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
