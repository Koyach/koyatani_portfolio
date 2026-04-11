import type { Metadata } from "next";
import { Noto_Sans_JP, DM_Mono, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";
import CommandPalette from "@/components/CommandPalette";
import PageTracker from "@/components/PageTracker";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://koyatani.com"),
  title: "谷昊埜 | Koya Tani — 慶應SFC / ミラコエ代表 / Bedrock Space COO",
  description:
    "谷昊埜（たにこうや）のポートフォリオ。慶應義塾大学SFC在学。学生団体ミラコエ代表として若者の政治参加を推進。Bedrock Space COO。元競技スキーヤー。",
  keywords: ["谷昊埜", "たにこうや", "Koya Tani", "慶應SFC", "ミラコエ", "Bedrock Space"],
  openGraph: {
    title: "谷昊埜 | Koya Tani",
    description:
      "慶應SFC在学。学生団体ミラコエ代表 / Bedrock Space COO / 元競技スキーヤー。",
    type: "website",
    locale: "ja_JP",
    url: "https://koyatani.com",
    siteName: "谷昊埜 Portfolio",
    images: [
      {
        url: "/images/og.JPG",
        width: 1200,
        height: 630,
        alt: "谷昊埜 | Koya Tani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "谷昊埜 | Koya Tani",
    description: "慶應SFC在学。学生団体ミラコエ代表 / Bedrock Space COO。",
    images: ["/images/og.JPG"],
    creator: "@koyach777",
  },
  alternates: {
    canonical: "https://koyatani.com",
  },
  other: {
    "theme-color": "#0c0f14",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "谷昊埜",
  alternateName: "Koya Tani",
  url: "https://koyatani.com",
  image: "https://koyatani.com/images/og.JPG",
  jobTitle: "Student / Entrepreneur",
  affiliation: [
    {
      "@type": "Organization",
      name: "ミラコエ",
      description: "若者の政治参加を促す学生団体",
    },
    {
      "@type": "Organization",
      name: "Bedrock Space",
      description: "AI Startup",
    },
    {
      "@type": "EducationalOrganization",
      name: "慶應義塾大学 総合政策学部（SFC）",
    },
  ],
  sameAs: [
    "https://www.instagram.com/koyatani_0828",
    "https://x.com/koyach777",
    "https://www.facebook.com/share/1FYjf7sFTV/",
    "https://note.com/koya_sfc",
  ],
  knowsAbout: [
    "Political Participation",
    "Civic Education",
    "Freestyle Skiing",
    "Entrepreneurship",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#0c0f14" />
        <meta name="google-site-verification" content="8ZkEJ-lThcmV9gYsTMnQgZQTwCtUqG38j-c3dvHAUCk" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${notoSans.variable} ${dmMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <LanguageProvider>
          <PageTracker />
          {children}
          <CommandPalette />
        </LanguageProvider>
      </body>
    </html>
  );
}
