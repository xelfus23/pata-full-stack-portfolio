import { motion } from "framer-motion";
import Section from "../../ui/section";
import Image from "next/image";
import useScroll from "@/hooks/useScroll";
import { useCursorState } from "../../../utils/cursorProvider";
import PrimaryButton from "@/components/ui/button/primaryButton";
import { useRouter } from "next/navigation";
import { skills } from "@/lib/skills";

const About: React.FC = () => {
    const { setCursorState } = useCursorState();
    const router = useRouter();

    const offset = useScroll();

    return (
        <Section
            id="about"
            title="About Me"
            subtitle="Learn about my skills and experience"
        >
            <div className="grid md:grid-cols-2 gap-12 items-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    onHoverStart={() => setCursorState({ scale: 2 })}
                    onHoverEnd={() => setCursorState({ scale: 0.5 })}
                    className="z-10"
                >
                    <div className="aspect-square rounded-2xl overflow-hidden relative bg-gradient-to-br from-primary/20 to-secondary/20">
                        {/* Replace with your image */}
                        <motion.div
                            animate={{
                                y: offset * 0.05,
                            }}
                            transition={{
                                duration: 0,
                            }}
                            className="absolute inset-0 flex items-center justify-center text-primary"
                        >
                            <Image
                                src={"/images/back.png"}
                                fill
                                alt="profile"
                                className="scale-140"
                            />
                        </motion.div>
                        <motion.div
                            animate={{
                                y: offset * 0,
                            }}
                            transition={{
                                duration: 1,
                            }}
                            className="absolute h-full w-full inset-0 flex items-center justify-center text-primary"
                        >
                            <Image
                                src={"/images/front.png"}
                                fill
                                sizes="auto"
                                alt="profile"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col space-y-6"
                >
                    <h3 className="text-2xl font-semibold mb-4 text-primary">
                        Front-end Developer
                    </h3>
                    <p className="mb-6 text-text/90">
                        I&apos;m a passionate front-end developer with a focus
                        on creating responsive, accessible, and performant web
                        applications. With expertise in React.js, Next.js, and
                        modern front-end technologies, I bring designs to life
                        with clean code and smooth interactions.
                    </p>
                    <p className="mb-6 text-text/90">
                        I enjoy tackling complex problems and continuously
                        learning new technologies to enhance my skillset and
                        deliver better solutions.
                    </p>

                    <div className="flex flex-col space-y-5 justify-between h-full">
                        <h4 className="text-xl font-medium mb-3 text-primary">
                            Skills
                        </h4>
                        <div className="flex flex-wrap gap-2 h-auto">
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{
                                        once: true,
                                        margin: "-100px",
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.1 * index,
                                    }}
                                    onHoverStart={() =>
                                        setCursorState({ scale: 1 })
                                    }
                                    onHoverEnd={() =>
                                        setCursorState({ scale: 0.5 })
                                    }
                                    className="px-3 py-1 font-mono  bg-secondary/10 text-text rounded-md border border-secondary/20"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-3 flex">
                        <PrimaryButton
                            label="Learn more"
                            onClick={() => router.push("/about")}
                            type="button"
                            
                        />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
