"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navBar";
import Footer from "./footer";
import ChatBox from "./chatbox";
import LoadingState from "./loadingState";
import { Lenis } from "lenis/react";
import { useState } from "react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if current path is admin route
    const isAdminRoute = pathname?.startsWith("/admin");
    const [lenisState, setLenisState] = useState(true);

    return !isAdminRoute ? (
        <LoadingState>
            <ChatBox setLenisState={setLenisState} />
            <Navbar />
            <Lenis
                options={{
                    duration: 2,
                    smoothWheel: lenisState,
                }}
                root
            />
            <div
                className="overflow-y-clip"
                onMouseOver={() => setLenisState(true)}
            >
                {children}
            </div>
            <Footer zIndex={1} />
        </LoadingState>
    ) : (
        children
    );
}
