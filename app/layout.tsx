import type { Metadata } from "next";
import { Geist, Syne } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SITE } from "@/data/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.portfolio),
  title: {
    default: `${SITE.name} · Engineering Portfolio`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.intro,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} · Engineering Portfolio`,
    description: SITE.tagline,
    url: SITE.portfolio,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · Engineering Portfolio`,
    description: SITE.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${syne.variable} antialiased`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
