"use client";
import React from "react";
import GridBackground from "@/components/ui/gridBackground";
import Hero from "@/components/sections/contactpage/hero";
import SideBar from "@/components/ui/sideBar";
const Contact = () => {
    const sections = [
        {
            component: <Hero />,
            id: "contact",
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
                <GridBackground />
            </div>
        </main>
    );
};

export default Contact;
