"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCursorState } from "../../utils/cursorProvider";

interface CursorFollowerProps {
    size?: number;
    lag?: number;
}

const CursorFollower: React.FC<CursorFollowerProps> = ({
    size = 50,
    lag = 0.003,
}) => {
    const { cursorState } = useCursorState();
    const { scale } = cursorState;

    // Use motion values directly instead of React state
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Create spring animations for smoother following
    const springX = useSpring(cursorX, {
        damping: 15,
        stiffness: 80,
        mass: 0.3,
    });

    const springY = useSpring(cursorY, {
        damping: 15,
        stiffness: 80,
        mass: 0.3,
    });

    // Set up mouse tracking
    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed pointer-events-none z-50 rounded-full bg-primary/10 backdrop-invert md:flex hidden"
            style={{
                width: size,
                height: size,
                x: springX,
                y: springY,
                translateX: `-50%`,
                translateY: `-50%`,
            }}
            animate={{
                scale: scale,
            }}
            transition={{
                scale: {
                    type: "spring",
                    damping: 12,
                    stiffness: 80,
                    mass: 0.1,
                    delay: lag,
                },
            }}
        />
    );
};

export default CursorFollower;
