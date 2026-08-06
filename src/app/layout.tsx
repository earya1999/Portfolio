import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandMenuProvider } from "@/components/command-menu";
import { ScrollProgress } from "@/components/scroll-progress";
import { profile } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eshaanarya.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.subheadline,
  keywords: [
    "Eshaan Arya",
    "Enterprise SaaS Implementation Consultant",
    "Implementation Consultant",
    "Solutions Consultant",
    "Professional Services",
    "Deployment Strategist",
    "Customer Success Engineer",
    "Technical Account Manager",
    "Forward Deployed Consultant",
    "Product Operations",
    "AI Implementation Consultant",
    "Purdue MSBAIM",
    "HighRadius",
    "SAP",
    "Oracle",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} · ${profile.role}`,
    description: profile.subheadline,
    siteName: profile.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — Portfolio`,
      },
    ],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d0d6e0" },
    { media: "(prefers-color-scheme: dark)", color: "#1e222b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    knowsLanguage: profile.languages,
    sameAs: [
      profile.socials.linkedin,
      profile.socials.github,
      profile.socials.instagram,
    ].filter(Boolean),
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Purdue University",
        department: "Daniels School of Business",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "SRM Institute of Science and Technology",
      },
    ],
    knowsAbout: [
      "Enterprise SaaS Implementation",
      "Solutions Consulting",
      "Customer Onboarding",
      "Business Process Transformation",
      "ERP Integrations",
      "AI Implementation",
      "Data Analytics",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CommandMenuProvider>
            <ScrollProgress />
            <div className="relative flex min-h-screen animate-fade-in flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="bottom-right" richColors closeButton />
          </CommandMenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
