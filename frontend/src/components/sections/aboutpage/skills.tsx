import { motion } from "motion/react";
import Section from "../../ui/section";
import { useCursorState } from "../../../utils/cursorProvider";
import Image from "next/image";

const Skills = () => {
    const { setCursorState } = useCursorState();
    const baseURL = "/icons/tech/";

    const skillCategories = [
        {
            name: "Frontend",
            skills: [
                {
                    icon: baseURL + "react.png",
                    name: "React.js",
                    level: 50,
                },
                {
                    icon: baseURL + "next.png",
                    name: "Next.js",
                    level: 50,
                },
                {
                    icon: baseURL + "ts.png",
                    name: "TypeScript",
                    level: 50,
                },
                {
                    icon: baseURL + "tailwind.png",
                    name: "TailwindCSS",
                    level: 60,
                },
                {
                    icon: baseURL + "react-native.svg",
                    name: "React Native",
                    level: 60,
                },
                {
                    icon: baseURL + "php.svg",
                    name: "PHP",
                    level: 30,
                },
                {
                    icon: baseURL + "html.png",
                    name: "HTML5",
                    level: 90,
                },
                {
                    icon: baseURL + "css.png",
                    name: "CSS3",
                    level: 70,
                },
                {
                    icon: baseURL + "js.png",
                    name: "JavaScript",
                    level: 60,
                },
            ],
        },
        {
            name: "Backend",
            skills: [
                {
                    icon: baseURL + "node.png",
                    name: "Node.js",
                    level: 10,
                },
                {
                    icon: baseURL + "express.png",
                    name: "Express.js",
                    level: 5,
                },
                {
                    icon: baseURL + "mongo-db.png",
                    name: "MongoDB",
                    level: 15,
                },
                {
                    icon: baseURL + "firebase.png",
                    name: "Firebase",
                    level: 40,
                },
                {
                    icon: baseURL + "postgres.png",
                    name: "PostgreSQL",
                    level: 10,
                },
            ],
        },
        {
            name: "Tools & Others",
            skills: [
                {
                    icon: baseURL + "git.png",
                    name: "Git/GitHub",
                    level: 50,
                },
                {
                    icon: baseURL + "figma.png",
                    name: "Figma",
                    level: 70,
                },
                {
                    icon: baseURL + "vscode.png",
                    name: "VS Code",
                    level: 90,
                },
                {
                    icon: baseURL + "motion.png",
                    name: "Motion",
                    level: 20,
                },
            ],
        },
    ];

    return (
        <Section
            id="skills"
            title="Technical Skill"
            subtitle="My technical skills and expertise"
            className="bg-secondary/5 backdrop-blur-sm"
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
                            className="rounded-lg p-6 "
                        >
                            <h3 className="text-xl font-semibold mb-4 text-primary">
                                {category.name}
                            </h3>
                            <div className="space-y-4">
                                {category.skills
                                    .sort((a, b) => b.level - a.level)
                                    .map((skill, skillIndex) => {
                                        return (
                                            <motion.div
                                                key={skill.name}
                                                className="space-y-2"
                                            >
                                                <div className="flex text-sm font-medium justify-between border border-secondary/20 p-4 rounded-xl">
                                                    <motion.div
                                                        className="flex items-center space-x-2 hover:scale-110 transition-all hover:cursor-pointer"
                                                        onHoverStart={() =>
                                                            setCursorState({
                                                                scale: 1.1,
                                                            })
                                                        }
                                                        onHoverEnd={() =>
                                                            setCursorState({
                                                                scale: 0.5,
                                                            })
                                                        }
                                                    >
                                                        <div className="h-12 relative rounded-sm aspect-square flex items-center justify-center">
                                                            <Image
                                                                src={skill.icon}
                                                                fill
                                                                alt=""
                                                                objectFit="contain"
                                                            />
                                                        </div>
                                                    </motion.div>

                                                    <div className="flex flex-col w-[80%]">
                                                        <div className="flex justify-between items-center  hover:cursor-default">
                                                            <span className="text-text">
                                                                {skill.name}
                                                            </span>
                                                            <span className="text-text/60 hover:cursor-default">
                                                                {skill.level}%
                                                            </span>
                                                        </div>
                                                        <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className="h-full bg-primary"
                                                                initial={{
                                                                    width: 0,
                                                                }}
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
                                                </div>
                                            </motion.div>
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
