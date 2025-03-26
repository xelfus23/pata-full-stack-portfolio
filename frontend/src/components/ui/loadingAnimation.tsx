import { motion } from "motion/react";

interface LoadingAnimationProps {
    size?: "small" | "medium" | "large";
    color?: "primary" | "secondary" | "text";
    className?: string;
}

const LoadingAnimation = ({
    size = "medium",
    color = "primary",
    className = "",
}: LoadingAnimationProps) => {
    // Define sizes
    const sizeMap = {
        small: "w-4 h-4",
        medium: "w-8 h-8",
        large: "w-12 h-12",
    };

    // Define colors
    const colorMap = {
        primary: "border-primary",
        secondary: "border-secondary",
        text: "border-text",
    };

    const containerVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1,
                ease: "linear",
                repeat: Infinity,
            },
        },
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <motion.div
                className={`${sizeMap[size]} border-2 ${colorMap[color]} rounded-full border-t-transparent`}
                initial={{ rotate: 0 }}
                animate="animate"
                variants={containerVariants}
            />
        </div>
    );
};

export default LoadingAnimation;
