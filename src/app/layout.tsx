import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import MatrixBackground from "@/components/MatrixBackground";
import IntroSequence from "@/components/IntroSequence";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kai (Kaisar Rayfa Al Baihaqqi) — Software Engineering Student & Developer",
  description:
    "Personal portfolio of Kaisar Rayfa Al Baihaqqi (Kai) — Software Engineering Student & Builder. Constantly learning, continuously evolving. #2030IslaNyata",
  keywords: [
    "portfolio",
    "software engineer",
    "web developer",
    "kaisaaru",
    "Kaisar Rayfa Al Baihaqqi",
    "Next.js",
    "Laravel",
    "TypeScript",
    "AI",
  ],
  authors: [{ name: "Kaisar Rayfa Al Baihaqqi" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-mono bg-[#050811] text-[#F8FAFC] antialiased min-h-screen relative`}
      >
        <ThemeProvider>
          {/* Full-Screen Cyber Preloader & Cinematic Intro */}
          <IntroSequence />

          {/* Custom Cyber/Terminal Cursor */}
          <CustomCursor />

          {/* Matrix & Binary Canvas Background */}
          <MatrixBackground />

          {/* Main content layer */}
          <div className="relative z-20">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
