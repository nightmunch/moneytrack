import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { NavigationBar } from "@/components/main/navbar";
import { FloatingNav } from "@/components/ui/floating-navbar";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MoneyTrack",
  description: "Financial Management Apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-200`}
      >
        <FloatingNav>
            <NavigationBar className="mx-auto mt-5 bg-white shadow-sm p-1 rounded-lg" />
        </FloatingNav>
        <NavigationBar className="fixed top-1 sm:inset-x-64 inset-x-10 mx-auto z-[5000] mt-5 bg-white shadow-sm p-1 rounded-lg" />
        {children}
      </body>
    </html>
  );
}
