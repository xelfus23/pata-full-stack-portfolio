// app/layouts.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/utils/cursorProvider";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "@/components/scrolltoTop";
import { LayoutWrapper } from "@/components/layoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Patrick John Medenilla",
    description: "Frontend developer specializing in React and Next.js",
    icons: "/icons/icon.png",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <Analytics />

            <ScrollToTop>
                <CursorProvider>
                    <body
                        className={`${inter.className} bg-background text-text scrollbar-hidden`}
                    >
                        <LayoutWrapper>{children}</LayoutWrapper>
                    </body>
                </CursorProvider>
            </ScrollToTop>
        </html>
    );
}
