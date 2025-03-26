import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface CircleLoadingProps {
    size: "small" | "medium" | "large";
    speed: "slow" | "moderate" | "fast";
}

export default function CircleLoading({ size, speed }: CircleLoadingProps) {
    const images = [
        {
            src: "/svg/ellipse-1.svg",
            duration: 1,
            delay: 0,
        },
        {
            src: "/svg/ellipse-2.svg",
            duration: 4,
            delay: 0,
        },
        {
            src: "/svg/ellipse-3.svg",
            duration: 2,
            delay: 0,
        },
        {
            src: "/svg/ellipse-4.svg",
            duration: 1.2,
            delay: 0,
        },
        {
            src: "/svg/ellipse-5.svg",
            duration: 3,
            delay: 0,
        },
        {
            src: "/svg/ellipse-6.svg",
            duration: 5,
            delay: 0,
        },
        {
            src: "/svg/ellipse-7.svg",
            duration: 3,
            delay: 0,
        },
        {
            src: "/svg/ellipse-8.svg",
            duration: 2,
            delay: 0,
        },
    ];

    return (
        <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.3 },
            }} // Fade and scale out
            style={{
                scale: size === "small" ? 0.2 : size === "medium" ? 0.5 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`flex justify-center items-center text-text-4xl font-bold bg-background z-50`}
        >
            {images.map((image, index) => (
                <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 0.5 }}
                    transition={{
                        duration: 3,
                    }}
                    key={index}
                    className="absolute w-100 aspect-square"
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration:
                                speed === "slow"
                                    ? image.duration * 1
                                    : speed === "moderate"
                                    ? image.duration * 0.8
                                    : image.duration * 0.5,
                            delay: image.delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="w-full h-full absolute"
                    >
                        <Image src={image.src} fill alt="" />
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
}
