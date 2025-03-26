// components/About/HeroSection.tsx

import React from "react";
import { motion } from "motion/react";
import { useWritingAnimation } from "@/hooks/useWritingAnimation";
import { useCursorState } from "@/utils/cursorProvider";

const HeroSection = () => {
    const { setCursorState } = useCursorState();

    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
        >
            <motion.div
                className="container z-10"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-3xl md:text-6xl font-bold mb-4 text-primary text-center cursor-default"
                    onHoverStart={() => setCursorState({ scale: 2 })}
                    onHoverEnd={() => setCursorState({ scale: 0.5 })}
                >
                    {useWritingAnimation(
                        "Driven by Code Fueled by Curiosity",
                        1,
                        0.02,
                        false
                    )}
                </motion.h1>
                <p className="text-lg md:text-xl font-mono text-text/80 leading-relaxed text-center cursor-default">
                    {useWritingAnimation(
                        `A passionate student developer eager to learn and build impactful solutions.`,
                        1,
                        0.03,
                        false
                    )}
                </p>
            </motion.div>
        </section>
    );
};

export default HeroSection;
