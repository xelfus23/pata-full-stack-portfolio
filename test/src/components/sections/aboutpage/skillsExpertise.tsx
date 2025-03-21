// components/About/SkillsExpertise.tsx

import React from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/section";

interface SkillProps {
    name: string;
    level: number; // Represent proficiency (e.g., 1-5, percentage)
}

const SkillBar = ({ name, level }: SkillProps) => {
    const barWidth = `${level * 20}%`; // Adjust multiplier based on your level scale

    return (
        <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
                <span className="text-md font-medium text-text">{name}</span>
                <span className="text-sm text-text/70">{level}/5</span>{" "}
                {/* Or display as percentage */}
            </div>
            <div className="w-full bg-background/50 rounded-full h-2.5 dark:bg-background/70">
                <motion.div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: barWidth }}
                    initial={{ width: 0 }}
                    animate={{ width: barWidth }}
                    transition={{ duration: 0.7 }}
                ></motion.div>
            </div>
        </div>
    );
};

const SkillsExpertise = () => {
    const skills: SkillProps[] = [
        { name: "TypeScript", level: 4 },
        { name: "React.js", level: 4 },
        { name: "Next.js", level: 3 },
        { name: "TailwindCSS", level: 5 },
        { name: "Framer Motion", level: 3 },
        // Add more skills here!
    ];

    return (
        <Section id="#skills-expertise" title="Skills & Expertise">
            <motion.div
                className="mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((skill, index) => (
                        <SkillBar
                            key={index}
                            name={skill.name}
                            level={skill.level}
                        />
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};

export default SkillsExpertise;
