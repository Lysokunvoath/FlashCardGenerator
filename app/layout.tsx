import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlashCardGenerator",
  description: "Create and study flashcards online",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const activePath = headersList.get('x-pathname') || '/';

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <Sidebar activePath={activePath} />
          <main className="flex-grow overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
