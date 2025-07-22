import {Banner} from "./banner.tsx";
import {SectionCode} from "@/lib/enums.ts";
import {useMediaQuery} from "react-responsive";
import IssueSubsection from "@/screens/sections/issue-subsection.tsx";
import GoodPointSubsection from "@/screens/sections/good-point-subsection.tsx";
import MuscleCrewSubsection from "@/screens/sections/muscle-crew-subsection.tsx";
import MovieSubsection from "@/screens/sections/movie-subsection.tsx";
import ScheduleSubsection from "@/screens/sections/schedule-subsection.tsx";
import InterviewSubsection from "@/screens/sections/interview-subsection.tsx";
import QaSubsection from "@/screens/sections/qa-subsection.tsx";
import RecruitSubsection from "@/screens/sections/recruit-subsection.tsx";
import EntrySubsection from "@/screens/sections/entry-subsection.tsx";
import CTAButton from "@/components/ui/Cta-button.tsx";

export default function LandingPage() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  })
  return <>
    <section id="banner" className="bg-black">
      <Banner />
    </section>

    <div className="bg-black" style={{
      backgroundImage: `url(/images/issue-bg.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <IssueSubsection/>
    </div>


    <div id={SectionCode.GOOD_POINT} className="bg-black" style={{
      backgroundImage: isMobile ? 'url(/images/good-point-bg-sp.png)' : 'url(/images/good-point-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: isMobile ? 'center' : 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <GoodPointSubsection />
    </div>

    <div id={SectionCode.MUSCLE_CREW}>
      <MuscleCrewSubsection />
    </div>

    <div
      id="movie"
      className="bg-black"
    >
      <MovieSubsection />
    </div>


    <section id={SectionCode.SCHEDULE} className="bg-black" style={{
      backgroundImage: `url(/images/schedule-bg.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <ScheduleSubsection />
    </section>

    <div
      id={SectionCode.INTERVIEW}
      className="bg-black" style={{
        backgroundImage: `url(/images/interview-bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <InterviewSubsection />
    </div>

    <QaSubsection />


    <RecruitSubsection />

    <div
      id="entry"
      className="bg-black"
      style={{
        backgroundImage: `url(/images/entry_bg.png)`,
        backgroundSize: 'contain',
        backgroundPosition: 'top',
      }}
    >
      <EntrySubsection />
    </div>
    <div className="md:hidden">
      <CTAButton />
    </div>
  </>
}