import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FavoritesProvider } from "@/context/favorites-context";

/** Editorial headings — per DESIGN.md */
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
/** Editorial body & utility — per DESIGN.md */
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "SAVOR — Recipe Finder | Thoughtful cooking for the modern pantry",
    template: "%s | SAVOR",
  },
  description:
    "SAVOR (Recipe Finder): search thousands of recipes by ingredients, dish name or diet. Full ingredient lists, step-by-step instructions, and a local favorites box.",
  keywords: ["recipes", "cooking", "recipe finder", "spoonacular", "food search"],
  openGraph: { title: "SAVOR — Recipe Finder", type: "website", locale: "en_US" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFBFA" },
    { media: "(prefers-color-scheme: dark)", color: "#101311" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="flex min-h-screen flex-col">
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