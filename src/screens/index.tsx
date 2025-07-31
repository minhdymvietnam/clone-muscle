import React, {lazy} from "react";
import {Banner} from "./banner.tsx";
import {SectionCode} from "@/lib/enums.ts";
import {useMediaQuery} from "react-responsive";
import LazySection from "@/components/ui/LazySection.tsx";
import {EntrySkeletonSubsection} from "@/components/skeletons";

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

    <div className="bg-black" style={{
      backgroundImage: `url(images/issue-bg.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <IssueSubsection/>
    </div>

    <div className="bg-black" id={SectionCode.GOOD_POINT} style={{
      backgroundImage: isMobile ? 'url(images/good-point-bg-sp.png)' : 'url(images/good-point-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: isMobile ? 'center' : 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <GoodPointSubsection/>
    </div>

    {/*<LazySection skeletonComponent={GoodPointSkeletonSubsection} id={SectionCode.GOOD_POINT}>*/}
    {/*  <div className="bg-black" style={{*/}
    {/*    backgroundImage: isMobile ? 'url(images/good-point-bg-sp.png)' : 'url(images/good-point-bg.png)',*/}
    {/*    backgroundSize: 'cover',*/}
    {/*    backgroundPosition: isMobile ? 'center' : 'center',*/}
    {/*    backgroundRepeat: 'no-repeat',*/}
    {/*  }}>*/}
    {/*    <GoodPointSubsection/>*/}
    {/*  </div>*/}
    {/*</LazySection>*/}

    <div id={SectionCode.MUSCLE_CREW}>
      <MuscleCrewSubsection/>
    </div>

    {/*<LazySection skeletonComponent={MuscleCrewSkeletonSubsection} id={SectionCode.MUSCLE_CREW}>*/}
    {/*  <MuscleCrewSubsection/>*/}
    {/*</LazySection>*/}

    <div className="bg-black" id={SectionCode.MOVIE}>
      <MovieSubsection/>
    </div>

    {/*<LazySection skeletonComponent={MovieSkeletonSubsection} id={SectionCode.MOVIE}>*/}
    {/*  <div className="bg-black">*/}
    {/*    <MovieSubsection/>*/}
    {/*  </div>*/}
    {/*</LazySection>*/}


    <section id={SectionCode.SCHEDULE} className="bg-black" style={{
      backgroundImage: `url(images/schedule-bg.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <ScheduleSubsection/>
    </section>
    {/*<LazySection skeletonComponent={ScheduleSkeletonSubsection} id={SectionCode.SCHEDULE}>*/}
    {/*  <section className="bg-black" style={{*/}
    {/*    backgroundImage: `url(images/schedule-bg.png)`,*/}
    {/*    backgroundSize: 'cover',*/}
    {/*    backgroundPosition: 'center',*/}
    {/*    backgroundRepeat: 'no-repeat',*/}
    {/*  }}>*/}
    {/*    <ScheduleSubsection/>*/}
    {/*  </section>*/}
    {/*</LazySection>*/}


    <div
      id={SectionCode.INTERVIEW}
      className="bg-black" style={{
        backgroundImage: `url(images/interview-bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <InterviewSubsection/>
    </div>
    {/*<LazySection skeletonComponent={InterviewSkeletonSubsection} id={SectionCode.INTERVIEW}>*/}
    {/*  <div*/}
    {/*    className="bg-black" style={{*/}
    {/*    backgroundImage: `url(images/interview-bg.png)`,*/}
    {/*    backgroundSize: 'cover',*/}
    {/*    backgroundPosition: 'center',*/}
    {/*    backgroundRepeat: 'no-repeat',*/}
    {/*  }}*/}
    {/*  >*/}
    {/*    <InterviewSubsection/>*/}
    {/*  </div>*/}
    {/*</LazySection>*/}

    <div id={SectionCode.QA}>
      <QaSubsection/>
    </div>
    {/*<LazySection skeletonComponent={QaSkeletonSubsection} id={SectionCode.QA}>*/}
    {/*  <QaSubsection/>*/}
    {/*</LazySection>*/}

    <div id={SectionCode.RECRUIT}>
      <RecruitSubsection/>
    </div>
    {/*<LazySection skeletonComponent={RecruitSkeletonSubsection} id={SectionCode.RECRUIT}>*/}
    {/*  <RecruitSubsection/>*/}
    {/*</LazySection>*/}

    <LazySection skeletonComponent={EntrySkeletonSubsection} id={SectionCode.ENTRY}>
      <div
          className="bg-black"
          style={{
            backgroundImage: `url(images/entry_bg.png)`,
            backgroundSize: '100%',
            backgroundPosition: 'top',
            backgroundRepeat: "repeat-y"
          }}
      >
        <EntrySubsection/>
      </div>
    </LazySection>

    <LazySection>
      <div className="md:hidden">
        <CTAButton/>
      </div>
    </LazySection>
  </>
});

LandingPage.displayName = 'LandingPage';

export default LandingPage;