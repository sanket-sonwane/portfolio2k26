import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ImpactMetrics } from "@/components/ImpactMetrics";
import { Leadership } from "@/components/Leadership";
import { Navbar } from "@/components/Navbar";
import { ResearchSection } from "@/components/ResearchSection";
import { SkillsMatrix } from "@/components/SkillsMatrix";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <ImpactMetrics />
        <FeaturedProjects />
        <ExperienceTimeline />
        <ResearchSection />
        <SkillsMatrix />
        <Education />
        <Leadership />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
