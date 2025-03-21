"use client";
import About from "@/components/sections/homepage/about";
import Contact from "@/components/sections/homepage/contact";
import Hero from "@/components/sections/homepage/hero";
import Projects from "@/components/sections/homepage/projects";
import GridBackground from "@/components/ui/gridBackground";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
    const { scrollYProgress } = useScroll();

    const sections = [
        { key: 1, component: <Hero /> },
        {
            key: 2,
            component: <About />,
        },
        {
            key: 4,
            component: <Projects />,
        },
        {
            key: 5,
            component: <Contact />,
        },
    ];

    useEffect(() => {
        console.log(scrollYProgress);
    }, [scrollYProgress]);
    return (
        <main className="scroll-smooth overflow-y-hidden relative">
            <div className="fixed right-4 top-1/2 transform bg-secondary/20 p-2 rounded-full -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
                {["hero", "about", "projects", "contact"].map(
                    (section, index) => (
                        <motion.div
                            key={section}
                            className="w-4 aspect-square rounded-full bg-accent cursor-pointer"
                            style={{
                                opacity:
                                    scrollYProgress.get() * (index + 1) >
                                    0.2 * (index + 1)
                                        ? 1
                                        : 0.4,
                            }}
                            whileHover={{
                                scale: 1.5,
                            }}
                            onClick={() =>
                                document
                                    .getElementById(section)
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        />
                    )
                )}
            </div>

            {sections.map((v, i) => (
                <div className="min-h-screen z-0" key={i}>
                    {v.component}
                </div>
            ))}

            <div className="absolute h-fit w-full top-0 -z-10">
                {Array(sections.length)
                    .fill(0)
                    .map((_, i) => (
                        <GridBackground key={i} />
                    ))}
            </div>
        </main>
    );
}
