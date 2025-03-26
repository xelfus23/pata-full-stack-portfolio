// frontend/src/app/404.tsx

"use client"; // Required for using hooks in this component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import { motion } from "motion/react";
import GridBackground from "@/components/ui/gridBackground";

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        document.title = "404 - Not Found"; // Update the document title
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                duration: 0.5,
            },
        },
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen text-text"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="text-4xl md:text-6xl font-bold mb-4 text-primary"
                variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                    },
                }}
            >
                404 - Not Found
            </motion.h1>
            <motion.p
                className="text-lg mb-8 text-text/80"
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: 0.2 },
                    },
                }}
            >
                Oops! The page you are looking for could not be found.
            </motion.p>
            <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { delay: 0.7, duration: 0.5 },
                    },
                }}
            >
                <button
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary/10 transition-colors duration-300"
                >
                    Go Back
                </button>
            </motion.div>
            <div className="absolute h-fit w-full top-0 -z-10">
                <GridBackground />
            </div>
        </motion.div>
    );
};

export default NotFound;
