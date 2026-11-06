// فایل: app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FavoritesProvider } from "@/context/favorites-context";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = { title: "Recipe Finder" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col ${playfair.variable} ${jakarta.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FavoritesProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}