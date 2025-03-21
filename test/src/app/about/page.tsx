"use client";
import React, { useEffect } from "react";
import HeroSection from "../../components/sections/aboutpage/hero";
import MyStory from "../../components/sections/aboutpage/myStory";
// import EducationExperience from "./components/educationExperience";
import PersonalInterests from "../../components/sections/aboutpage/personalInterest";
import Head from "next/head";
import Skills from "../../components/ui/skills";
import GridBackground from "@/components/ui/gridBackground";
// import Roadmap from "./components/roadmap";
import { usePathname } from "next/navigation";

const AboutPage = () => {
    const sections = [
        {
            key: 1,
            component: <HeroSection />,
        },
        {
            key: 2,
            component: <MyStory />,
        },
        {
            key: 4,
            component: <Skills />,
        },
        {
            key: 6,
            component: <PersonalInterests />,
        },
    ];

    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className=" text-text pt-16 relative overflow-y-hidden">
            <Head>
                <title>About Me - Patrick John Medenilla</title>
                <meta
                    name="description"
                    content="Learn more about Patrick John Medenilla's journey, skills, and passion for web development."
                />
            </Head>
            {sections.map((v, i) => (
                <div className="z-0" key={i}>
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
        </div>
    );
};

export default AboutPage;
