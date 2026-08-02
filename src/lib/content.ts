import profileJson from "../../content/profile.json";
import overviewJson from "../../content/overview.json";
import experienceJson from "../../content/experience.json";
import educationJson from "../../content/education.json";
import skillsJson from "../../content/skills.json";
import toolsJson from "../../content/tools.json";
import certificationsJson from "../../content/certifications.json";

export type Profile = typeof profileJson;
export type Overview = typeof overviewJson;
export type ExperienceEntry = (typeof experienceJson)[number];
export type EducationEntry = (typeof educationJson)[number];
export type SkillCategory = (typeof skillsJson)[number];
export type Tool = (typeof toolsJson)[number];
export type Certification = (typeof certificationsJson)[number];

export const profile: Profile = profileJson;
export const overview: Overview = overviewJson;
export const experience: ExperienceEntry[] = experienceJson;
export const education: EducationEntry[] = educationJson;
export const skills: SkillCategory[] = skillsJson;
export const tools: Tool[] = toolsJson;
export const certifications: Certification[] = certificationsJson;
