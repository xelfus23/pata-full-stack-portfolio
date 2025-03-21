import { motion } from "framer-motion";
import Link from "next/link";
import { useCursorState } from "../../utils/cursorProvider";

interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    index: number;
    onTopOfPage?: boolean;
}

const ProjectCard = ({
    onTopOfPage,
    title,
    description,
    technologies,
    imageUrl,
    githubUrl,
    liveUrl,
    index,
}: ProjectCardProps) => {
    const { setCursorState } = useCursorState();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: onTopOfPage ? 1 : 0, y: onTopOfPage ? 0 : 50 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-background border border-secondary/20 rounded-xl overflow-hidden hover:border-primary/50 transition-colors hover:cursor-crosshair duration-300"
            onHoverStart={() => setCursorState({ scale: 2 })}
            onHoverEnd={() => setCursorState({ scale: 0.5 })}
        >
            <div className="aspect-video bg-secondary/10 relative overflow-hidden">
                {imageUrl ? (
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-primary/30">
                        Project Preview
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary group-hover:text-primary/90 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-text/80 mb-4">{description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-secondary/10 text-text/90 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    {githubUrl && (
                        <Link
                            href={githubUrl}
                            className="text-primary hover:text-primary/80 transition-colors duration-300 flex items-center gap-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                            Code
                        </Link>
                    )}

                    {liveUrl && (
                        <Link
                            href={liveUrl}
                            className="text-primary hover:text-primary/80 transition-colors duration-300 flex items-center gap-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Live Demo
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
