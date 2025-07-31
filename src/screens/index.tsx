import React, { lazy, Suspense } from "react";
import {Banner} from "./banner.tsx";
import {SectionCode} from "@/lib/enums.ts";
import {useMediaQuery} from "react-responsive";
import LazySection from "@/components/ui/LazySection.tsx";
import LazyImage from "@/components/ui/LazyImage.tsx";

// Lazy load sections for better performance
const IssueSubsection = lazy(() => import("@/screens/sections/issue-subsection.tsx"));
const GoodPointSubsection = lazy(() => import("@/screens/sections/good-point-subsection.tsx"));
const MuscleCrewSubsection = lazy(() => import("@/screens/sections/muscle-crew-subsection.tsx"));
const MovieSubsection = lazy(() => import("@/screens/sections/movie-subsection.tsx"));
const ScheduleSubsection = lazy(() => import("@/screens/sections/schedule-subsection.tsx"));
const InterviewSubsection = lazy(() => import("@/screens/sections/interview-subsection.tsx"));
const QaSubsection = lazy(() => import("@/screens/sections/qa-subsection.tsx"));
const RecruitSubsection = lazy(() => import("@/screens/sections/recruit-subsection.tsx"));
const EntrySubsection = lazy(() => import("@/screens/sections/entry-subsection.tsx"));
const CTAButton = lazy(() => import("@/components/ui/Cta-button.tsx"));

const LandingPage = React.memo(() => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  })
  
  return <>
    <section id="banner" className="bg-black">
      <Banner />
    </section>

    <LazySection>
      <div className="bg-black" style={{
        backgroundImage: `url(images/issue-bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <IssueSubsection/>
      </div>
    </LazySection>

    <LazySection>
      <div id={SectionCode.GOOD_POINT} className="bg-black" style={{
        backgroundImage: isMobile ? 'url(images/good-point-bg-sp.png)' : 'url(images/good-point-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'center' : 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <GoodPointSubsection />
      </div>
    </LazySection>

    <LazySection>
      <div id={SectionCode.MUSCLE_CREW}>
        <MuscleCrewSubsection />
      </div>
    </LazySection>

    <LazySection>
      <div id="movie" className="bg-black">
        <MovieSubsection />
      </div>
    </LazySection>

    <LazySection>
      <section id={SectionCode.SCHEDULE} className="bg-black" style={{
        backgroundImage: `url(images/schedule-bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <ScheduleSubsection />
      </section>
    </LazySection>

    <LazySection>
      <div
        id={SectionCode.INTERVIEW}
        className="bg-black" style={{
          backgroundImage: `url(images/interview-bg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <InterviewSubsection />
      </div>
    </LazySection>

    <LazySection>
      <QaSubsection />
    </LazySection>

    <LazySection>
      <RecruitSubsection />
    </LazySection>

    <LazySection>
      <div
        id="entry"
        className="bg-black"
        style={{
          backgroundImage: `url(images/entry_bg.png)`,
          backgroundSize: '100%',
          backgroundPosition: 'top',
          backgroundRepeat: "repeat-y"
        }}
      >
        <EntrySubsection />
      </div>
    </LazySection>
    
    <LazySection>
      <div className="md:hidden">
        <CTAButton />
      </div>
    </LazySection>
  </>
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;