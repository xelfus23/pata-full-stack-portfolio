"use client";
import React from "react";
import { motion } from "motion/react";

interface SimpleLoadingProps {
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

const DotLoading: React.FC<SimpleLoadingProps> = ({
    text,
    fullScreen = false,
    className = "",
}) => {
    const loadingDots = {
        animate: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const dot = {
        initial: { opacity: 0, y: 0 },
        animate: {
            opacity: [0, 1, 0],
            y: [0, -2, 0],
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    const loadingElement = (
        <div
            className={`flex flex-col items-center justify-center ${className}`}
        >
            <motion.div
                variants={loadingDots}
                initial="initial"
                animate="animate"
                className="flex space-x-3"
            >
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        variants={dot}
                        className="w-2 h-2 bg-primary rounded-full"
                    />
                ))}
            </motion.div>
            {text && <p className="mt-4 text-text/70">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
                {loadingElement}
            </div>
        );
    }

    return loadingElement;
};

export default DotLoading;
