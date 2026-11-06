import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { FavoritesProvider } from "@/context/favorites-context";

export const metadata: Metadata = {
  title: { default: "Recipe Finder", template: "%s | Recipe Finder" },
  description:
    "Discover vibrant, wholesome dishes tailored to the exact ingredients sitting on your kitchen counter right now.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      style={{
        ["--font-bricolage" as any]: "'Georgia', 'Times New Roman', serif",
        ["--font-dm-sans" as any]: "system-ui, -apple-system, sans-serif",
      }}
    >
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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