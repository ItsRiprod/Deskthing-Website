import "../app/global.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React, { JSX, ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: {
  title: string;
  description: string;
  keywords: string;
} = {
  title: "DeskThing",
  description: "Take back your CarThing.",
  keywords:
    "CarThing, DeskThing, Laptop, Desktop, App Launcher, Open Source, Spotify",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8018324056802093" />
        <link rel="icon" href="/imgs/AppIcon.png" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
        />

        {/* Content Security Policy - adjust as needed for your specific requirements */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' vercel.live *.vercel-analytics.com *.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' *.vercel-analytics.com *.speed-insights.vercel.app;"
        />

        {/* Trust and SEO related */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="DeskThing" />
        <link rel="canonical" href="https://deskthing.app" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="DeskThing" />
        <meta property="og:description" content="Take back your CarThing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deskthing.app" />
        <meta
          property="og:image"
          content="https://deskthing.app/imgs/AppIcon.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DeskThing" />
        <meta name="twitter:description" content="Take back your CarThing." />
        <meta
          name="twitter:image"
          content="https://deskthing.app/imgs/AppIcon.png"
        />
      </head>
      <body className="bg-neutral-950 text-neutral-50">
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
