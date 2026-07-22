import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IntroGate } from "@/components/blocks/intro-context";
import { ProceduralBackground } from "@/components/blocks/procedural-background";
import { JsonLd } from "@/components/blocks/json-ld";
import { Footer } from "@/components/blocks/footer";
import "./globals.css";

const SITE_URL = "https://sitzey.com.hr";
// Built from two sentences already published verbatim elsewhere on the site
// (the hero eyebrow in galaxy-interactive-hero-section.tsx and the services
// intro in services-section.tsx), trimmed to stay under Google's ~155-160
// char SERP truncation point rather than cutting off mid-sentence.
const SITE_DESCRIPTION =
  "Website design & development studio for small businesses. Every project is scoped and hand-built for what your business actually does.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "Sitzey — Website Design & Development Studio",
    template: "%s | Sitzey",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Sitzey — Website Design & Development Studio",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Sitzey",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitzey — Website Design & Development Studio",
    description: SITE_DESCRIPTION,
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[110] focus-visible:rounded-full focus-visible:border focus-visible:border-purple-400/60 focus-visible:bg-black focus-visible:px-5 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Skip to content
        </a>
        <JsonLd />
        <ProceduralBackground />
        <IntroGate>{children}</IntroGate>
        <Footer />
      </body>
    </html>
  );
}
