import Section from "../../ui/section";
import ProjectCard from "../../ui/card";
import { projectsData } from "@/lib/project/project-data";
import PrimaryButton from "@/components/ui/button/primaryButton";
import { useRouter } from "next/navigation";

const Projects = () => {
    const router = useRouter();

    return (
        <Section
            id="projects"
            title="Featured Projects"
            subtitle="Check out some of my recent work"
        >
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {projectsData.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        githubUrl={project.githubUrl}
                        liveUrl={project.liveUrl}
                        imageUrl={project.imageUrl} //Pass Image to Project Card
                        index={index}
                    />
                ))}
            </div>
            <div className="flex items-center justify-center mt-20">
                <PrimaryButton
                    label="View more"
                    type="button"
                    onClick={() => router.push("/projects")}
                />
            </div>
        </Section>
    );
};

export default Projects;
