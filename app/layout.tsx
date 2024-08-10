"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { useState } from "react";
import MobileSidebar from "./components/MobileSidebar";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <html lang="en">
      <Head>
        <title>Platform Angkutan</title>
      </Head>
      <body className={inter.className}>
        <div className="min-h-screen">
          <div className="flex">
            <MobileSidebar setter={setShowSidebar} />
            <Sidebar show={showSidebar} setter={setShowSidebar} />
            <div className="flex flex-col flex-grow w-full min-h-screen">
              <Navbar />
              <div className="flex-grow">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
