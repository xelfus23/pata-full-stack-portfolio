"use client";
import React from "react";
import GridBackground from "@/components/ui/gridBackground";
import Hero from "@/components/sections/projectpage/hero";
import SideBar from "@/components/ui/sideBar";

const ProjectsPage = () => {
    const sections = [
        {
            component: <Hero />,
            id: "hero",
        },
    ];

    return (
        <main>
            <SideBar sections={sections} />

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
};

export default ProjectsPage;
