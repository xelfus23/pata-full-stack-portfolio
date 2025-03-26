import React from "react";
import { motion } from "motion/react";
import useScroll from "@/hooks/useScroll";

const GridBackground = () => {
    const gridSize = 20; // Adjust for grid density (smaller = denser)
    const strokeWidth = 0.5; // Adjust for line thickness
    const gridColor = "#FFFFFF"; // Subtle grey with transparency
    const scroll = useScroll();

    const svgVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 0.8,
            y: scroll * 0.3,
            transition: {
                duration: 0, // Fade-in duration
            },
        },
        exit: { opacity: 0, transition: { duration: 0.3 } },
    };

    return (
        <motion.svg
            variants={svgVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            className="-z-10 h-screen inset-0 pointer-events-none static" // Cover entire area, no interaction
            style={{
                zIndex: -1, // Behind other content
                overflow: "hidden", // Prevent scrollbars if gridSize is too large
            }}
        >
            <defs>
                <pattern
                    id="grid"
                    width={gridSize}
                    height={gridSize}
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                        fill="none"
                        stroke={gridColor}
                        strokeWidth={strokeWidth}
                        opacity={0.1}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </motion.svg>
    );
};

export default GridBackground;
