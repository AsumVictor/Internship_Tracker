"use client";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthProvider from "@/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Career Progression Hub",
  description: "Track, manage, and optimize your job search journey",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </Provider>
  );
}
