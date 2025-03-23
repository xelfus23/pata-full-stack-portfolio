"use client";
import About from "@/components/sections/homepage/about";
import Contact from "@/components/sections/homepage/contact";
import Hero from "@/components/sections/homepage/hero";
import Projects from "@/components/sections/homepage/projects";
import GridBackground from "@/components/ui/gridBackground";
import SideBar from "@/components/ui/sideBar";

export default function Home() {
    const sections = [
        {
            component: <Hero />,
            id: "hero",
        },
        {
            component: <About />,
            id: "about",
        },
        {
            component: <Projects />,
            id: "projects",
        },
        {
            component: <Contact />,
            id: "contact",
        },
    ];

    return (
        <main className="scroll-smooth overflow-y-hidden relative">
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
}
