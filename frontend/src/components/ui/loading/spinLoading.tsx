"use client";
import React from "react";
import { motion } from "framer-motion";

interface SpinningLoadingProps {
    size?: "small" | "medium" | "large";
    color?: string;
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

const SpinningLoading: React.FC<SpinningLoadingProps> = ({
    size = "medium",
    color = "primary",
    text,
    fullScreen = false,
    className = "",
}) => {
    
    const sizeMap = {
        small: "h-6 w-6 border-2",
        medium: "h-10 w-10 border-3",
        large: "h-16 w-16 border-4",
    };

    const spinTransition = {
        repeat: Infinity,
        ease: "linear",
        duration: 1,
    };

    const loadingElement = (
        <div
            className={`flex flex-col items-center justify-center ${className}`}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={spinTransition}
                className={`${sizeMap[size]} rounded-full border-t-transparent border-${color} border-solid`}
            />
            {text && <p className="mt-4 text-text/70 font-mono">{text}</p>}
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

export default SpinningLoading;
