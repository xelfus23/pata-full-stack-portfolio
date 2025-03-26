"use client";
import { motion, useInView } from "motion/react";
import { useState, useRef } from "react";

export const useWritingAnimation = (
    text: string,
    duration: number,
    delay: number,
    loop: boolean
) => {
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });
    const spltText = text.split("");

    return (
        <span ref={containerRef}>
            {spltText.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                        duration: duration,
                        delay: index * delay,
                        ease: "easeInOut",
                        staggerChildren: 0.05,
                        repeat: loop ? Infinity : 0,
                    }}
                    style={{
                        scale: hoveredItem === index ? 2 : 1,
                    }}
                    onHoverStart={() => setHoveredItem(index)}
                    onHoverEnd={() => setHoveredItem(null)}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};
