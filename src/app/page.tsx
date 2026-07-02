import { Suspense } from "react";
import { Navbar } from "@/components/nav/navbar";
import { CommandPalette } from "@/components/nav/command-palette";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { AiWorkflow } from "@/components/sections/ai-workflow";
import { GithubSection } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

function SectionFallback() {
  return (
    <div className="mx-auto grid min-h-[40vh] w-full max-w-6xl place-items-center px-5">
      <div className="size-6 animate-spin rounded-full border-2 border-border border-t-accent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <CommandPalette />
      <main className="relative flex flex-col">
        <Hero />
        {/* Section separator via a hairline gradient */}
        <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-border to-transparent" />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <AiWorkflow />
        <Suspense fallback={<SectionFallback />}>
          <GithubSection />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
