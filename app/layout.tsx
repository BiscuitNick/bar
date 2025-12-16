import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Retro Games Hub",
    template: "%s | Retro Games Hub",
  },
  description: "Play classic retro games like Tetris, Snake, and Minesweeper directly in your browser. Built with Next.js and React.",
  keywords: ["retro games", "tetris", "snake", "minesweeper", "browser games", "next.js", "react"],
  authors: [{ name: "Retro Games Hub Team" }],
  openGraph: {
    title: "Retro Games Hub",
    description: "Play classic retro games directly in your browser.",
    type: "website",
    siteName: "Retro Games Hub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
