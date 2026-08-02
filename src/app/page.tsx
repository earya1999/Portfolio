import { Hero } from "@/components/sections/hero";
import { Overview } from "@/components/sections/overview";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Tools } from "@/components/sections/tools";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Overview />
      <Experience />
      <Education />
      <Skills />
      <Tools />
      <Certifications />
      <Contact />
    </>
  );
}
