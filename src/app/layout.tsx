import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kai (Kaisar Rayfa) — Software Engineering Student & WebApp Developer",
  description:
    "Personal portfolio of Kai (Kaisar Rayfa), a Software Engineering student passionate about building useful web applications that solve real problems.",
  keywords: [
    "portfolio",
    "software engineer",
    "web developer",
    "full stack",
    "React",
    "Next.js",
    "Laravel",
  ],
  authors: [{ name: "Kaisar Rayfa" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
