import { motion } from "framer-motion";
import Section from "./section";
import { useCursorState } from "../../utils/cursorProvider";

const Skills = () => {
    const { setCursorState } = useCursorState();

    const skillCategories = [
        {
            name: "Frontend",
            skills: [
                { name: "React.js", level: 70 },
                { name: "Next.js", level: 55 },
                { name: "TypeScript", level: 50 },
                { name: "TailwindCSS", level: 65 },
                { name: "Framer Motion", level: 55 },
                { name: "React Native", level: 75 },
                { name: "Three.js", level: 5 },
                { name: "Responsive Design", level: 70 },
                { name: "HTML5", level: 90 },
                { name: "CSS3", level: 70 },
                { name: "JavaScript", level: 60 },
            ],
        },
        {
            name: "Backend",
            skills: [
                { name: "Node.js", level: 10 },
                { name: "Express.js", level: 5 },
                { name: "MongoDB", level: 15 },
                { name: "Firebase", level: 40 },
                { name: "PostgreSQL", level: 10 },
            ],
        },
        {
            name: "Tools & Others",
            skills: [
                { name: "Git/GitHub", level: 25 },
                { name: "Figma", level: 70 },
                { name: "VS Code", level: 90 },
                { name: "Responsive Design", level: 95 },
            ],
        },
    ];

    return (
        <Section
            id="skills"
            title="Skills"
            subtitle="My technical skills and expertise"
        >
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {skillCategories.map((category, categoryIndex) => (
                    <div key={category.name}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.5,
                                delay: categoryIndex * 0.2,
                            }}
                            onHoverStart={() => setCursorState({ scale: 2 })}
                            onHoverEnd={() => setCursorState({ scale: 0.5 })}
                            className="bg-secondary/5 rounded-lg p-6 border border-secondary/20"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-primary">
                                {category.name}
                            </h3>
                            <div className="space-y-4">
                                {category.skills
                                    .sort((a, b) => b.level - a.level)
                                    .map((skill, skillIndex) => {
                                        return (
                                            <div
                                                key={skill.name}
                                                className="space-y-2"
                                            >
                                                <div className="flex justify-between text-sm font-medium">
                                                    <span className="text-text">
                                                        {skill.name}
                                                    </span>
                                                    <span className="text-text/60">
                                                        {skill.level}%
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-secondary/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-primary"
                                                        initial={{ width: 0 }}
                                                        whileInView={{
                                                            width: `${skill.level}%`,
                                                        }}
                                                        viewport={{
                                                            once: true,
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                            delay:
                                                                0.3 +
                                                                skillIndex *
                                                                    0.1,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Skills;
