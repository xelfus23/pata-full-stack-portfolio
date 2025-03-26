"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Section from "@/components/ui/section";

interface RoadmapItem {
    id: number;
    title: string;
    description: string;
    position: number; // Percentage along the path (0-100)
}

const ProgressiveRoadmap = () => {
    const roadmapItems: RoadmapItem[] = [
        {
            id: 1,
            title: "Frontend Foundations",
            description: "HTML, CSS, JavaScript mastery.",
            position: 10,
        },
        {
            id: 2,
            title: "React.js Expertise",
            description: "Components, Hooks, State Management.",
            position: 30,
        },
        {
            id: 3,
            title: "Next.js Framework",
            description: "Server-side rendering, routing, API routes.",
            position: 50,
        },
        {
            id: 4,
            title: "Backend with Node.js",
            description: "Building APIs with Express.",
            position: 70,
        },
        {
            id: 5,
            title: "Full-Stack Applications",
            description: "Connecting frontend and backend.",
            position: 90,
        },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"], // Trigger when the bottom of the viewport hits the top of the section
    });

    const isInView = useInView(containerRef);

    const yRange = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

    // Calculate dynamic height for the container based on the number of items
    const containerHeight = roadmapItems.length * 600; // Adjust 600px per item as needed

    return (
        <Section id="roadmap" title="My Roadmap">
            <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                ref={containerRef}
                style={{
                    height: `${containerHeight}px`, // Use dynamic height
                }}
            >
                {/* Sticky SVG */}
                <motion.div
                    className="sticky top-20 z-50 h-[50vh]" // Sticky positioning and height
                    style={{
                      top: '10vh', // Adjust as needed
                    }}
                >
                    <motion.svg
                        height={"100%"}
                        width={"100%"}
                        viewBox="0 0 100 100"
                        className="border"
                    >
                        <AnimatedLine
                            path="M1 1 L1 30 L50 30 L50 40"
                            strokeWidth={1}
                            progress={isInView ? yRange : 0} // Animate only when in view
                        />
                    </motion.svg>
                </motion.div>

                <div className="absolute left-20 top-0 w-full">
                    {roadmapItems.map((item) => (
                        <div key={item.id} className="">
                            {item.title}
                        </div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};

export default ProgressiveRoadmap;

interface AnimatedLineProps {
    path: string; // The SVG path data (e.g., "M0 0 L100 100")
    stroke?: string; // Stroke color
    strokeWidth?: number; // Stroke width
    fill?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    progress: any;
}

const AnimatedLine = ({
    path,
    stroke = "#00ffe6",
    strokeWidth = 1,
    fill = "none",
    progress,
}: AnimatedLineProps) => {
    const pathLength = React.useRef<number>(0);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        const tempPath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        tempPath.setAttribute("d", path);
        pathLength.current = tempPath.getTotalLength();
        setIsLoaded(true);
    }, [path]);

    return (
        isLoaded && (
            <motion.path
                d={path}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={fill}
                style={{
                    pathLength: progress,
                }} // Important: Initial value for pathLength
            />
        )
    );
};