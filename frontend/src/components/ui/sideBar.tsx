import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SectionProps {
    component: React.ReactNode;
    id: string;
}

export default function SideBar({ sections }: { sections: SectionProps[] }) {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "0px",
                threshold: 0.5,
            }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sections]);

    return (
        <div className="fixed right-4 top-1/2 transform bg-secondary/20 p-2 rounded-full -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
            {sections.map((section) => (
                <motion.div
                    key={section.id}
                    className="w-4 aspect-square rounded-full bg-accent cursor-pointer"
                    animate={{
                        opacity: activeSection === section.id ? 1 : 0.5,
                        scale: activeSection === section.id ? 1.2 : 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 0,
                    }}
                    whileHover={{
                        scale: 1.5,
                    }}
                    onClick={() =>
                        document
                            .getElementById(section.id)
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                />
            ))}
        </div>
    );
}
