import { useEffect, useState } from "react";

export default function useScroll() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScrollPosition(window.pageYOffset);
        });

        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, []);

    return scrollPosition;
}
