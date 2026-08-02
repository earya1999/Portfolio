import { Hero } from "@/components/sections/hero";
import { Overview } from "@/components/sections/overview";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Tools } from "@/components/sections/tools";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { getGithubProjects } from "@/lib/github";

/** Refresh GitHub projects periodically (webhook can invalidate sooner). */
export const revalidate = 600;

export default async function HomePage() {
  const { projects, error } = await getGithubProjects();

  return (
    <>
      <Hero />
      <Overview />
      <Experience />
      <Education />
      <Skills />
      <Tools />
      <Projects projects={projects} error={error} />
      <Certifications />
      <Contact />
    </>
  );
}
