import type { Metadata } from "next";
import localFont from "next/font/local";

import Navigation from "@/components/navigation-bar/navigation";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/providers/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import PhotoViewProvider from "@/providers/photo-view-provider";

const circularStdBook = localFont({
  src: "./CircularStd-Book.otf",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(circularStdBook.className)}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <PhotoViewProvider>
              <Navigation />
              <main className="min-h-[90dvh] relative">{children}</main>
              <Footer />
            </PhotoViewProvider>
          </ThemeProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
