import type { Metadata } from "next";
import { Noto_Sans_JP, DM_Mono, Space_Grotesk } from "next/font/google";
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
  title: "谷昊埜 | Koya Tani",
  description:
    "学生団体ミラコエ代表 / Bedrock Space CoS / フリースタイルスキーヤー。対話で社会を変える19歳のポートフォリオ。",
  openGraph: {
    title: "谷昊埜 | Koya Tani",
    description:
      "学生団体ミラコエ代表 / Bedrock Space CoS / フリースタイルスキーヤー",
    type: "website",
    locale: "ja_JP",
  },
  other: {
    "theme-color": "#0c0f14",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${notoSans.variable} ${dmMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
