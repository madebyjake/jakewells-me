import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { LinksSection } from "@/components/sections/links-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { getExperience, getProfile, getProjects, getSkills } from "@/lib/content";

export default function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const skills = getSkills();
  const experience = getExperience();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10 md:px-12 md:py-14">
      <HeroSection
        name={profile.name}
        profileImage={profile.profileImage}
        tagline={profile.tagline}
        intro={profile.intro}
        location={profile.location}
      />
      <LinksSection links={profile.links} />
      <SkillsSection groups={skills.groups} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experience={experience} />
      <SiteFooter name={profile.name} />
    </main>
  );
}
