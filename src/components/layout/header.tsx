import {useEffect, useState} from "react";
import {SectionCode} from "@/lib/enums.ts";
import {Menu} from "@/components/layout/Menu.tsx";
import {useSmoothScroll} from "@/hooks/useSmoothScroll.ts";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";

const logoUrl = "images/logo.png"

const navItems = [
  {code: SectionCode.MESSAGE, title: "メッセージ", subtitle: "MESSAGE"},
  {code: SectionCode.GOOD_POINT, title: "魅力ポイント", subtitle: "GOOD POINT"},
  {code: SectionCode.MUSCLE_CREW, title: "アンバサダー", subtitle: "MUSCLE CREW"},
  {code: SectionCode.SCHEDULE, title: "スケジュール", subtitle: "SCHEDULE"},
  {code: SectionCode.INTERVIEW, title: "先輩セキュリティの声", subtitle: "INTERVIEW"},
  {code: SectionCode.QA, title: "よくある質問", subtitle: "Q&A"},
  {code: SectionCode.RECRUIT, title: "採用情報", subtitle: "RECRUIT"},
];

export default function Header() {
  const [activeNav, setActiveNav] = useState(SectionCode.MESSAGE);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const {scrollTo} = useSmoothScroll();

  const handleBackToTop = () => {
    scrollTo(0);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const footer = document.querySelector("footer");

      setShowBackToTop(scrollY > 200 && (footer?.getBoundingClientRect()?.top ?? 0) >= window.innerHeight);

      const current = navItems.findLast(item => {
        const section = document.getElementById(item.code);
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100; // Header height as offset
        }
        return false;
      })?.code || SectionCode.MESSAGE;
      setActiveNav(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onToggleMenu = () => {
    setIsMenuOpen(prevState => !prevState)
  }

  return <>
    <header className="fixed w-full top-0 left-0 bg-black z-50">
      <div className="flex items-center justify-between px-4 3xl:pr-0 lg:pl-[30px] min-h-14 lg:min-h-[90px] w-[100lvw]">
      <div className="h-6 lg:h-[35px] gap-2.5 lg:gap-3.5 flex items-center cursor-pointer" onClick={handleBackToTop}>
        <img
          src={logoUrl}
          className="w-auto h-full object-cover"
          alt="Img fv logo"
        />
        <div
          className="[font-family:'Inter',Helvetica] font-bold text-white text-[15px] lg:text-xl tracking-[0] leading-[normal] whitespace-nowrap">
          中途採用ページ
        </div>
      </div>

      <div className="hidden 3xl:flex items-center gap-5">
        <div className="flex h-full items-start gap-9">
          {navItems.map((item) => (
            <a
              key={item.code}
              href={`#${item.code}`}
              className="w-fit flex flex-col items-center group justify-between gap-2.5 relative h-full"
            >
              <div
                className="[font-family:'Noto_Sans_JP',Helvetica] font-bold text-neon-yellow text-lg tracking-[0] leading-[normal]"
              >
                {item.title}
              </div>
              <div
                className="[font-family:'Noto_Sans_JP',Helvetica] font-bold text-white text-xs tracking-[0] leading-[normal] whitespace-nowrap"
              >
                {item.subtitle}
              </div>

              <span className={cn("absolute top-[calc(100%+6px)] hidden group-hover:block transition delay-300 right-1/2 transform translate-x-1/2 w-[34px] h-[3px] mt-2 bg-neon-yellow", {"block": activeNav === item.code})}/>
            </a>
          ))}
        </div>
        <div className="h-full flex items-center ">
          <a href="#movie"><button
            className="w-[180px] [font-family:'Teko',Helvetica] font-medium text-white text-[40px] tracking-[0] leading-[normal] shine movie-shape py-4 px-6 bg-[#5D5D5D] relative overflow-hidden">
            MOVIE
          </button></a>

          <a href="#entry">
            <button
              className="w-[180px] [font-family:'Teko',Helvetica] font-medium text-[#333333] text-[40px] tracking-[0] leading-[normal] shine entry-shape py-4 px-6 bg-[#FCFF00] relative overflow-hidden">
              ENTRY
            </button>
          </a>
        </div>
      </div>

      <button
        className="3xl:hidden !bg-transparent p-0 border-none focus:outline-none"
        onClick={onToggleMenu}
      >
        {isMenuOpen ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.207031" y="21.1924" width="29" height="3" transform="rotate(-45 0.207031 21.1924)" fill="white"/>
            <rect width="29" height="3" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 23.3184 21.1924)" fill="white"/>
          </svg>
        ) : <svg width="32" height="18" viewBox="0 0 32 18" fill="none" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.900391 0.759983H31.0604V2.83998H0.900391V0.759983Z" fill="white"/>
          <path d="M8.17969 8.03999H31.0597V10.12H8.17969V8.03999Z" fill="white"/>
          <path d="M15.4609 15.32H31.0609V17.4H15.4609V15.32Z" fill="white"/>
        </svg>}
      </button>
    </div>

    <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
  </header>
    {showBackToTop && (
      <Button className="rounded-none !fixed bottom-20 left-[calc(100lvw-66px)] md:left-[calc(100lvw-100px)] md:bottom-10 md:right-0 w-[50px] block md:w-[83px] h-auto shine aspect-square z-40 cursor-pointer p-0">
        <img
          className="w-full h-full object-cover"
          alt="back to top"
          src="/images/back-to-top.png"
          onClick={handleBackToTop}
        />
      </Button>
    )}
  </>
}