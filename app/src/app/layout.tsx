import type { Metadata } from "next";
import { Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "100-minds",
  description: "掌握跨学科思维模型，做出更好的决策。探索来自物理学、经济学、心理学等领域的核心思维工具。",
  keywords: ["100-minds", "思维模型", "决策", "第一性原理", "心智模型", "批判性思维"],
  authors: [{ name: "100-minds" }],
  openGraph: {
    title: "100-minds",
    description: "掌握跨学科思维模型，做出更好的决策",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`antialiased font-sans ${notoSerif.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
