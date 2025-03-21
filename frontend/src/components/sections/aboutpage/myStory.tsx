import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion"; // Import useInView
import Section from "@/components/ui/section";
import { FadeIn, move } from "@/animations/animations";

const MyStory = () => {
    const fullText = useMemo(
        () => [
            "Hello! I'm Patrick John Medenilla, a passionate web developer currently pursuing a Bachelor's degree in Information Technology with a major in Web Application Development at AMA University.",
            "My journey into the world of code began with a simple curiosity, and it has evolved into a full-blown passion for creating engaging and user-friendly web experiences.",
            "As a student with a growing passion for software development, it started with building simple websites. I was immediately captivated by the power of code to create and solve problems.",
            "Currently, I'm focused on mastering React, Next.js, and backend development. I'm always seeking new challenges and opportunities to expand my skillset and contribute to meaningful projects.",
            "My goal is to become a full-stack developer, work on innovative web applications, and I'm excited about the future and the potential to make a positive impact through technology.",
        ],
        []
    );

    const [displayedParagraphs, setDisplayedParagraphs] = useState([""]);
    const [paragraphIndex, setParagraphIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const sectionRef = useRef(null); // Create a ref
    const isInView = useInView(sectionRef); // Check if the section is in view

    useEffect(() => {
        // Only start the animation if the section is in view
        if (isInView && paragraphIndex < fullText.length) {
            const currentParagraph = fullText[paragraphIndex];

            if (letterIndex < currentParagraph.length) {
                const timer = setTimeout(() => {
                    setDisplayedParagraphs((prevParagraphs) => {
                        const updatedParagraphs = [...prevParagraphs];
                        updatedParagraphs[paragraphIndex] =
                            (updatedParagraphs[paragraphIndex] || "") +
                            currentParagraph[letterIndex];

                        return updatedParagraphs;
                    });
                    setLetterIndex((prevLetterIndex) => prevLetterIndex + 1);
                }, 3);

                return () => clearTimeout(timer);
            } else {
                setParagraphIndex(
                    (prevParagraphIndex) => prevParagraphIndex + 1
                );
                setLetterIndex(0);
                setDisplayedParagraphs((prevParagraphs) => [
                    ...prevParagraphs,
                    "",
                ]);
            }
        }
    }, [fullText, paragraphIndex, letterIndex, isInView]); // Add isInView to the dependency array

    return (
        <Section id="my-journey" title="My Journey" className="min-h-screen">
            {/* Attach the ref */}
            <div
                ref={sectionRef}
                className="container mx-auto space-y-10 flex flex-col items-center"
            >
                <motion.div
                    className="lg:w-2/3 p-8 rounded-3xl bg-secondary/10 shadow-lg backdrop-blur-xs border border-secondary/20 flex flex-col space-y-10 text-justify"
                    variants={FadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {displayedParagraphs.map((paragraph, index) => (
                        <motion.p
                            variants={move}
                            initial="initial"
                            whileInView={"animate"}
                            custom={{ from: "bottom", delay: index * 0.5 }}
                            viewport={{ once: true }}
                            key={index}
                            className="text-lg leading-relaxed text-text font-light font-mono"
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </motion.div>

                {/* <motion.div
                    variants={FadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    <a
                        href="/roadmap"
                        className="inline-block px-8 py-4 font-semibold rounded-full bg-gradient-to-r bg-primary hover:bg-primary/80 text-background transition-all duration-300"
                    >
                        Explore My Roadmap
                    </a>
                </motion.div> */}
            </div>
        </Section>
    );
};

export default MyStory;
