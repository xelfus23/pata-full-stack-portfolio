// components/About/HeroSection.tsx

import React from "react";
import { motion } from "framer-motion";
import { useWritingAnimation } from "@/hooks/useWritingAnimation";

const HeroSection = () => {
    return (
        <section className="relative flex flex-col items-center pt-90 min-h-screen">
            <motion.div
                className="container z-10"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl md:text-6xl font-bold mb-4 text-primary text-center">
                    {useWritingAnimation(
                        "Driven by Code Fueled by Curiosity",
                        1,
                        0.02,
                        false
                    )}
                </h1>
                <p className="text-lg md:text-xl font-mono text-text/80 leading-relaxed text-center">
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
