import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { SaleProvider } from "@/components/SaleProvider";
import { Header } from "@/components/layout/Header";
import { SaleAnnouncementBar } from "@/components/layout/SaleAnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TheoSheets | Elegant Sheet Music for Piano, Worship, and Cinematic Performance",
  description:
    "Premium digital sheet music for piano, worship, and cinematic performance. Instant delivery, beautiful scores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col" suppressHydrationWarning>
        <SessionProvider>
          <SaleProvider>
            <SaleAnnouncementBar />
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </SaleProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
