import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Hind_Siliguri } from "next/font/google";
import { business } from "@/config/business";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `${business.brandName} — ${business.tagline}`,
    template: `%s | ${business.brandName}`,
  },
  description: `${business.brandName} (${business.brandNameEn}) — বাসস্থান ও ছোট ব্যবসার জন্য ইন্টারনেট সেবার ডেমো সাইট। প্যাকেজ তুলনা, কভারেজ চেক, সংযোগের অনুরোধ ও সাপোর্ট।`,
  applicationName: business.brandNameEn,
  keywords: [
    "ইন্টারনেট",
    "ওয়াইফাই",
    "ফাইবার",
    "ISP",
    "বাংলাদেশ",
    "নেটওয়েভ",
    "NetWave",
  ],
  authors: [{ name: business.brandNameEn }],
  // Page-level Open Graph and Twitter tags come from `pageMetadata()`
  // (src/lib/metadata.ts); only the site-wide defaults live here. They
  // are plain strings, not templates — the page helper already composes
  // the final "Title | Brand" form.
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: business.brandName,
    title: `${business.brandName} — ${business.tagline}`,
    description:
      "বাসস্থান ও ছোট ব্যবসার জন্য ইন্টারনেট সেবার ডেমো সাইট। প্যাকেজ তুলনা, কভারেজ চেক ও সংযোগের অনুরোধ।",
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.brandName} — ${business.tagline}`,
    description:
      "বাসস্থান ও ছোট ব্যবসার জন্য ইন্টারনেট সেবার ডেমো সাইট।",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F3A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      // The inline script below adds `js` to this element before React
      // hydrates, which React would otherwise report as a mismatch.
      suppressHydrationWarning
      className={`${geist.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <head>
        {/*
          Marks the document as scripted before first paint, so the scroll
          reveal styles only apply when JavaScript is actually able to
          reveal the content again. If this script does not run, nothing
          is ever hidden.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-canvas">
        <a href="#main-content" className="skip-link">
          মূল কনটেন্টে যান
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
