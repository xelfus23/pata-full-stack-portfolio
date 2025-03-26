import React, { useState, useEffect, useMemo, useRef } from "react";
import { useInView } from "motion/react";
import Section from "@/components/ui/section";
import { motion } from "motion/react";
import { accent, primary, secondary } from "@/constant/colors";
// import PrimaryButton from "@/components/ui/button/primaryButton";

const MyJourney = () => {
    // 1. Story Content (useMemo for Efficiency)
    const fullText = useMemo(
        () => [
            "Hello! I'm Patrick John Medenilla, a passionate web developer currently pursuing a Bachelor's degree in Information Technology with a major in Web Application Development at AMA University.",
            "My journey into the world of programming began with a simple curiosity, and it has evolved into a full-blown passion for creating user-friendly and engaging web experiences.",
            "As a student with a growing passion for web development, it started with building a simple website. I was immediately captivated by the power of code to create and solve problems.",
            "Currently, I am focused on mastering React.js, Next.js, and learning backend development. I like seeking new challenges and opportunities to expand my skills and knowledge and to contribute to meaningful projects.",
            "My goal is to become a full-stack developer, work on innovative web applications, and I'm excited about the future and the potential to make a positive impact through technology.",
        ],
        []
    );

    // 2. State to track which paragraphs to show
    const [showedParagraphIndex, setShowedParagraphIndex] = useState(0);

    // 3. Intersection Observer (using motion/react)
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    // 4. useEffect to stagger the paragraphs
    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (isInView) {
            // Set the first paragraph to show immediately
            setShowedParagraphIndex(0);

            // Set up an interval to show the next paragraph every 4 seconds
            timerId = setInterval(() => {
                setShowedParagraphIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    if (nextIndex < fullText.length) {
                        return nextIndex;
                    } else {
                        clearInterval(timerId); // Stop the timer when all paragraphs are shown
                        return prevIndex; // Keep the last index
                    }
                });
            }, 2000);
        }

        // Cleanup function to clear the interval when the component unmounts or is out of view
        return () => {
            clearInterval(timerId);
        };
    }, [isInView, fullText.length]); // Depend on fullText.length to restart when texts change

    return (
        <div className="overflow-y-hidden relative ">
            {/* <div className="flex items-center justify-center">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: isInView ? "2%" : "100%" }}
                    transition={{
                        delay: 0.2,
                        duration: 2,
                        ease: "easeInOut",
                    }}
                    className="h-2 w-full bg-secondary rounded-full"
                />
            </div> */}
            <Section id="my-journey" title="My Journey">
                <div className="w-full items-center justify-center flex ">
                    <div className="-z-10 absolute w-full h-[120%] md:translate-y-36 translate-y-26 top-0 flex flex-col items-center">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: isInView ? "80%" : "0%" }}
                            transition={{ duration: 3, delay: 0 }}
                            className="w-1 bg-secondary transition-all z-0"
                        />
                    </div>

                    <div
                        ref={sectionRef}
                        className="space-y-10 flex flex-col items-center relative min-h-screen"
                    >
                        {fullText.map((text, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity:
                                        index <= showedParagraphIndex ? 1 : 0,
                                }}
                                transition={{ delay: 0, duration: 1 }}
                                className={`w-[50%] ${
                                    index % 2 === 0 ? "self-start" : "self-end"
                                } flex items-center `} // Hide if not yet showed
                            >
                                {index <= showedParagraphIndex && index % 2 ? (
                                    <div className="w-30 h-1 bg-secondary" />
                                ) : (
                                    ""
                                )}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0, duration: 1 }}
                                    className={`${
                                        index % 2
                                            ? "bg-secondary/5"
                                            : "bg-accent/5"
                                    } border border-secondary/30 rounded-xl lg:p-10 p-2`}
                                >
                                    {index <= showedParagraphIndex
                                        ? text
                                              .split("")
                                              .map((letter, index) => (
                                                  <motion.span
                                                      key={index}
                                                      initial={{ opacity: 0 }}
                                                      animate={{ opacity: 1 }}
                                                      transition={{
                                                          delay: index * 0.01,
                                                          duration: 1,
                                                      }}
                                                  >
                                                      {letter}
                                                  </motion.span>
                                              ))
                                        : ""}
                                </motion.p>
                                {index <= showedParagraphIndex &&
                                (index % 2) - 1 ? (
                                    <div className="w-30 h-1 bg-secondary" />
                                ) : (
                                    ""
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            <div className="z-10">
                <svg width={"100%"} height={"10%"} viewBox="0 0 100 7">
                    <path d="M100 0 0 3 0 5 100 5" fill={primary} />
                    <path d="M100 3 0 4 0 6 100 7" fill={accent} />
                    <path d="M100 5 0 6 0 7 100 7" fill={secondary} />
                </svg>
            </div>
        </div>
    );
};

export default MyJourney;
