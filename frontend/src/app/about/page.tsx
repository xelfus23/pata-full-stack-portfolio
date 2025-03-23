"use client";
import React, { useEffect } from "react";
import HeroSection from "../../components/sections/aboutpage/hero";
import MyStory from "../../components/sections/aboutpage/myStory";
import PersonalInterests from "../../components/sections/aboutpage/personalInterest";
import Head from "next/head";
import Skills from "../../components/ui/skills";
import GridBackground from "@/components/ui/gridBackground";
import { usePathname } from "next/navigation";
import SideBar from "@/components/ui/sideBar";

const AboutPage = () => {
    const sections = [
        {
            key: 1,
            component: <HeroSection />,
            id: "hero",
        },
        {
            key: 2,
            component: <MyStory />,
            id: "my-journey",
        },
        {
            key: 4,
            component: <Skills />,
            id: "skills",
        },
        {
            key: 6,
            component: <PersonalInterests />,
            id: "personal-interest",
        },
    ];

    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <main className="scroll-smooth overflow-y-hidden relative">
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

            <SideBar sections={sections} />

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

export default AboutPage;
