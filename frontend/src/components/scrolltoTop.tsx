// src/components/ScrollToTop.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface ScrollToTopProps {
    children: React.ReactNode;
}

function ScrollToTop({ children }: ScrollToTopProps) {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return <>{children}</>;
}

export default ScrollToTop;