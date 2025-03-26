import React from "react";
import { motion } from "motion/react";
import Section from "@/components/ui/section";
import Image from "next/image";

interface ExperienceProps {
    title: string;
    institution: string;
    time: string;
    description: string;
    logo: string;
    alt: string;
}

const EducationExperience = () => {
    const experience: ExperienceProps[] = [
        {
            title: "Bachelor of Science in Information Technology 2025",
            institution: "AMA University",
            time: "2021-2025",
            description:
                "Currently pursuing a degree in Information Technology, focusing on web development.",
            logo: "/icons/ama-logo.png",
            alt: "AMA University",
        },
    ];

    return (
        <Section id="education-eperience" title="Education & Experience">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="p-4 bg-secondary/5 rounded-2xl"
            >
                {experience.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 ">
                        <div className="p-4 ">
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.logo}
                                    fill
                                    alt={item.alt}
                                    objectFit="contain"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-text">
                                {item.title}
                            </h3>
                            <p className="text-md text-text/80">
                                {item.institution}
                            </p>
                            <p className="text-sm text-text/60">{item.time}</p>
                            <p className="text-lg text-text/90 mt-2 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </Section>
    );
};

export default EducationExperience;
