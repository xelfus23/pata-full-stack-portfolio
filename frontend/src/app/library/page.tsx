"use client";
import { useWritingAnimation } from "@/hooks/useWritingAnimation";
// import { useWritingAnimation } from "@/hooks/useWritingAnimation";
// import { componentsData } from "@/lib/library_data";
// import Link from "next/link";
import { motion } from "motion/react";
// import { move } from "@/animations/animations";
import React from "react";

// Export the component directly as the default export
export default function LibraryPage() {
    return (
        <div className="border-l-1 rounded-md border-secondary/20 col-span-4 flex p-8 flex-col space-y-8 justify-center items-center">
            <motion.h1
                animate={{ display: "block" }}
                initial={{ display: "none" }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                }}
            >
                {useWritingAnimation(
                    "Still working on this page...",
                    1,
                    0.05,
                    false
                )}
            </motion.h1>
        </div>
    );
}
