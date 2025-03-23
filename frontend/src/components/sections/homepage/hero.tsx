import { useWritingAnimation } from "@/hooks/useWritingAnimation";
import { motion } from "framer-motion";
import { useCursorState } from "../../../utils/cursorProvider";
import PrimaryButton from "@/components/ui/button/primaryButton";
import SecondaryButton from "@/components/ui/button/secondaryButton";
import { move } from "@/animations/animations";
import { useRouter } from "next/navigation";

const Hero: React.FC = () => {
    // const scroll = useScroll() * 0.4;
    const { setCursorState } = useCursorState();
    const router = useRouter();

    return (
        <section
            id="hero"
            className="relative flex flex-col items-center justify-center min-h-screen py-16 mt-16 overflow-hidden"
        >
            <div className="container mx-auto px-4 z-10 justify-center flex items-center">
                <motion.div
                    // animate={{
                    //     y: scroll,
                    // }}
                    transition={{
                        duration: 0.2,
                    }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{ duration: 0.5 }}
                        onMouseOver={() => setCursorState({ scale: 2 })}
                        onMouseLeave={() => setCursorState({ scale: 0.5 })}
                        className="text-4xl md:text-6xl font-bold mb-6 cursor-default"
                    >
                        <span className="text-text">Hi, I&apos;m </span>
                        <span className="text-primary">
                            {useWritingAnimation(
                                "Patrick John",
                                2,
                                0.02,
                                false
                            )}
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                            type: "tween",
                        }}
                    >
                        <motion.h2
                            // animate={{ y: scroll }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="text-xl md:text-1xl font-medium mb-8 text-text/80 font-mono pointer-events-none"
                        >
                            {useWritingAnimation(
                                `I build modern website with React, Next.js, TailwindCSS
                            and more`,
                                2,
                                0.01,
                                false
                            )}
                        </motion.h2>
                    </motion.div>

                    <motion.div
                        transition={{
                            duration: 1,
                        }}
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.div
                            variants={move}
                            animate={"animate"}
                            initial={"initial"}
                            custom={{ from: "bottom", delay: 1 }}
                            transition={{
                                duration: 1,
                            }}
                        >
                            <PrimaryButton
                                onClick={() => router.push("/projects")}
                                label="View my work"
                                disabled={false}
                                type="button"
                            />
                        </motion.div>
                        <motion.div
                            variants={move}
                            animate={"animate"}
                            initial={"initial"}
                            custom={{ from: "bottom", delay: 1.2 }}
                            transition={{
                                duration: 1,
                            }}
                        >
                            <SecondaryButton
                                onClick={() => router.push("/contact")}
                                label="Contact Me"
                                disabled={false}
                                type="button"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                >
                    <path
                        d="M12 5V19M12 19L5 12M12 19L19 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            <motion.div className="w-screen h-screen left-1/3 top-30 absolute">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        y: [0, 10, 0], // Move up and down
                        x: [0, 5, 0], // Move left and right (optional)
                        opacity: [0.3, 0.8, 0.3], // Fade in and out
                    }}
                    transition={{
                        duration: 5, // Adjust for desired speed
                        repeat: Infinity,
                        repeatType: "loop", // or "yoyo" for a back-and-forth motion
                        ease: "easeInOut", // or "easeOut", "linear", etc.
                        delay: 0.2,
                    }}
                    className="bg-secondary/20 w-20 aspect-square rotate-45 absolute top-55 left-80 -translate-x-1/2 -translate-y-1/2" // Center it and use translate
                />
                <motion.div
                    animate={{
                        y: [0, 10, 0], // Move up and down
                        x: [0, 5, 0], // Move left and right (optional)
                        opacity: [0.3, 0.8, 0.3], // Fade in and out
                    }}
                    transition={{
                        duration: 5, // Adjust for desired speed
                        repeat: Infinity,
                        repeatType: "loop", // or "yoyo" for a back-and-forth motion
                        ease: "easeInOut", // or "easeOut", "linear", etc.
                        delay: 0.4,
                    }}
                    className="bg-primary/20 w-[10%] aspect-square rotate-45 absolute top-70 left-80"
                />
                <motion.div
                    animate={{
                        y: [0, 10, 0], // Move up and down
                        x: [0, 5, 0], // Move left and right (optional)
                        opacity: [0.3, 0.8, 0.3], // Fade in and out
                    }}
                    transition={{
                        duration: 5, // Adjust for desired speed
                        repeat: Infinity,
                        repeatType: "loop", // or "yoyo" for a back-and-forth motion
                        ease: "easeInOut", // or "easeOut", "linear", etc.
                        delay: 0.6,
                    }}
                    className="bg-secondary/20 w-[5%] aspect-square rotate-45 absolute top-60 left-40"
                />
                <motion.div
                    animate={{
                        y: [0, 10, 0], // Move up and down
                        x: [0, 5, 0], // Move left and right (optional)
                        opacity: [0.3, 0.8, 0.3], // Fade in and out
                    }}
                    transition={{
                        duration: 5, // Adjust for desired speed
                        repeat: Infinity,
                        repeatType: "loop", // or "yoyo" for a back-and-forth motion
                        ease: "easeInOut", // or "easeOut", "linear", etc.
                        delay: 0.8,
                    }}
                    className="bg-accent/20 w-[4%] aspect-square rotate-45 absolute top-100 left-1/9"
                />

                <motion.div
                    animate={{
                        y: [0, 10, 0], // Move up and down
                        x: [0, 5, 0], // Move left and right (optional)
                        opacity: [0.3, 0.8, 0.3], // Fade in and out
                    }}
                    transition={{
                        duration: 5, // Adjust for desired speed
                        repeat: Infinity,
                        repeatType: "loop", // or "yoyo" for a back-and-forth motion
                        ease: "easeInOut", // or "easeOut", "linear", etc.
                        delay: 1,
                    }}
                    className="bg-accent/20 w-[2%] aspect-square rotate-45 absolute top-118 left-1/6"
                />
            </motion.div>
        </section>
    );
};

export default Hero;
