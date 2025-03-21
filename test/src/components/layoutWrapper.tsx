"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navBar";
import Footer from "./footer";
import ChatBox from "./chatbox";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if current path is admin route
    const isAdminRoute = pathname?.startsWith("/admin");

    return !isAdminRoute ? (
        <>
            <ChatBox />
            <Navbar />
            {children}
            <Footer zIndex={1} />
        </>
    ) : (
        children
    );
}
