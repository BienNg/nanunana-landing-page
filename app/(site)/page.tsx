import { Suspense } from "react";
import { sectionIds } from "@/content/nav";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Founder } from "@/components/sections/Founder";
import { Courses } from "@/components/sections/Courses";
import { RunningClasses, RunningClassesFallback } from "@/components/sections/RunningClasses";
import { Pathways } from "@/components/sections/Pathways";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { ConsultationForm } from "@/components/form/ConsultationForm";
import { serverEnv } from "@/lib/env";
import { MotionLoader } from "@/components/motion/MotionLoader";

/** Refresh the page about once a day so cached Google reviews stay current. */
export const revalidate = 60 * 60 * 24;

export default function Home() {
  return (
    <>
      <Hero />
      <div id={sectionIds.about}>
        <Stats />
        <Founder />
      </div>
      <Courses />
      <Suspense fallback={<RunningClassesFallback />}>
        <RunningClasses />
      </Suspense>
      <Pathways />
      <Process />
      <Team />
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <Gallery />
      <Faq />
      <Contact form={<ConsultationForm turnstileSiteKey={serverEnv.turnstile()?.siteKey} />} />
      <MotionLoader />
    </>
  );
}
