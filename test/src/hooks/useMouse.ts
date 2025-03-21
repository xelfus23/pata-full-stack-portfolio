"use client";
import { useEffect, useState } from "react";

type MousePosition = {
    x: number;
    y: number;
};

export default function useCursorPosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
    });

    const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            updateMousePosition(e);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return mousePosition;
}
