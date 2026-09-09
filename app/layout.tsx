import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bass Sheets",
  description: "Personal catalog of bass sheets",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <AppHeader />
        <div className="mx-auto flex w-full max-w-6xl flex-1">
          <AppSidebar />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
