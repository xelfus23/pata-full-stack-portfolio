"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import CursorFollower from "./ui/cursor";

export default function LoadingState({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.div
                    key="loading"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.3 },
                    }} // Fade and scale out
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex justify-center items-center h-screen text-text-4xl font-bold bg-background z-50 cursor-none"
                >
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 0.1,
                            duration: 1,
                        }}
                        style={{
                            textShadow: "0px 0px 10px #00ffe6", // Adjust values as needed
                        }}
                        className=" text-text "
                    >
                        LOADING
                    </motion.h1>
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
                                    duration: image.duration,
                                    delay: image.delay,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="w-full h-full absolute"
                            >
                                <Image
                                    src={image.src}
                                    fill
                                    alt=""
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.5 } }} // Fade in after a delay
                    exit={{ opacity: 0 }} // Optional: Add an exit animation for the content
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <CursorFollower lag={0.05} />
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
