"use client";
import useScroll from "@/hooks/useScroll";
import { useCursorState } from "../../utils/cursorProvider";
import useCursorPosition from "@/hooks/useMouse";

export default function Debug() {
    const scrollY = useScroll();
    const { cursorState } = useCursorState();
    const cursorPosition = useCursorPosition();

    const offsets = [
        scrollY,
        // Math.floor(scrollY * 0.9),
        // Math.floor(scrollY * 0.8),
        // Math.floor(scrollY * 0.7),
        // Math.floor(scrollY * 0.6),
        // Math.floor(scrollY * 0.5),
        // Math.floor(scrollY * 0.4),
        // Math.floor(scrollY * 0.3),
        // Math.floor(scrollY * 0.2),
        Math.floor(scrollY * 0.1),
    ];

    return (
        <div className="fixed inset-0 z-10 pointer-events-none w-full h-full flex flex-col items-center justify-center">
            <div className="fixed w-70 top-20 p-4 left-5 border-1 border-red-800 text-white gap-4 flex flex-col">
                <div>
                    <b>Scroll:</b>
                    {offsets.map((x, i) => (
                        <p key={i}>
                            Scroll Offset {i === 0 ? "" : "x 0.1"}:{" "}
                            <span className="text-green-400">{x}</span>
                        </p>
                    ))}
                </div>
                <div>
                    <b>Cursor: </b>
                    <p>
                        Scale:{" "}
                        <span className="text-green-400">
                            {cursorState.scale}
                        </span>
                    </p>
                    <p>
                        Cursor X:{" "}
                        <span className="text-green-400">
                            {cursorPosition.x}
                        </span>
                    </p>
                    <p>
                        Cursor Y:{" "}
                        <span className="text-green-400">
                            {cursorPosition.y}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
