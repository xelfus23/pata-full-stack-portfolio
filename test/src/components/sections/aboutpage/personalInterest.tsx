import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Section from "@/components/ui/section";
import { FadeIn, move } from "@/animations/animations"; // Assuming you have these animations

const PersonalInterests = () => {
    const fullText = useMemo(
        () => [
            "When I'm not staring at code (which, let's be honest, is a lot!), I love unwinding by strumming my guitar or tickling the ivories on my piano. And yeah, I'm a gamer too – nothing beats a good online session to recharge!",
            "I find that these hobbies aren't just for fun; they actually fuel my creativity and problem-solving skills when I'm back in the coding zone.",
            "Plus, exploring different melodies and game mechanics is kind of like exploring new frameworks – it's all about learning and experimenting!",
        ],
        []
    );

    const [displayedParagraphs, setDisplayedParagraphs] = useState([""]);
    const [paragraphIndex, setParagraphIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef);

    useEffect(() => {
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
                }, 50); // Adjust timing as needed

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
    }, [fullText, paragraphIndex, letterIndex, isInView]);

    return (
        <Section id="personal-interest" title="Beyond Code" className="min-h-1/2" subtitle="A peek into my life outside coding">
            <div
                ref={sectionRef}
                className="container mx-auto space-y-10 flex flex-col items-center"
            >
                <motion.div
                    className="lg:w-2/3 p-8 flex flex-col space-y-10 text-justify"
                    variants={FadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                >
                    {displayedParagraphs.map((paragraph, index) => (
                        <motion.p
                            variants={move}
                            initial="initial"
                            whileInView="animate"
                            custom={{ from: "bottom", delay: index * 0.5 }}
                            viewport={{ once: true }}
                            key={index}
                            className="text-lg leading-relaxed text-text"
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default PersonalInterests;
