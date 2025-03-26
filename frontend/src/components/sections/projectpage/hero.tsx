import ProjectCard from "@/components/ui/card";
import Section from "@/components/ui/section";
import { projectsData } from "@/lib/project/project-data";
import { motion } from "motion/react";

export default function Hero() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <Section
            id="projects"
            title="My Projects"
            subtitle="A collection of projects I've worked on, but still unfinished."
        >
            <motion.div
                className="grid md:grid-cols-2 gap-6 lg:gap-8"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }} // Adjust amount as needed
            >
                {projectsData.map((project, index) => (
                    <motion.div variants={item} key={index}>
                        <ProjectCard
                            title={project.title}
                            description={project.description}
                            technologies={project.technologies}
                            githubUrl={project.githubUrl}
                            liveUrl={project.liveUrl}
                            index={index}
                            onTopOfPage={true}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
}
