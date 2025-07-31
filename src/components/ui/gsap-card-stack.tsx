import {useRef, ReactNode, useEffect} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger);

interface GSAPCardStackProps {
  children: ReactNode;
  className?: string;
  id?: string;
  backgroundImage?: string;
  cards: Array<{
    id: string | number;
    content: ReactNode;
  }>;
}

export const GSAPCardStack = ({
  children,
  className = '',
  id,
  backgroundImage,
  cards
}: GSAPCardStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  });
  const startPosition = isMobile ? '-=70 top' : '-=120 top';

  useGSAP(() => {
    if (!containerRef.current || !cardsRef.current) return;

    // const cardElements = cardsRef.current.querySelectorAll('[class*="card-"]');

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: startPosition,
        end: () => `+=${(cards.length - 1) * 100}%`,
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });

    gsap.utils.toArray(cardsRef.current.children).forEach((card, index) => {
      if (!card) return;
      // not set animation for first card
      if (index === 0) {
        tl.to(card, { yPercent: 0, duration: 0.5 });
      } else {
        tl.fromTo(card, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 100, duration: 0.5, ease: 'power2.in' });
      }
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div
      id={id}
      className={`relative w-full pt-[70px] pb-[78px] md:py-[120px] ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundColor: "#"
      }}
    >
      <div style={{
        backgroundImage: `url("images/yellow-bg-top.png")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top left',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 300,
        zIndex: 0
      }} />
      {/* Header */}
      <div className="w-full z-30 pb-5 md:pb-8">
        {children}
      </div>

      {/* Cards container */}
      <div className="flex relative items-center justify-center" ref={containerRef}>
        <div className="relative w-full max-w-[1644px] flex">
          {/* AMBASSADOR text */}
          <div className="hidden md:block flex-1" style={{backgroundImage: "url(images/AMBASSADOR.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center right", backgroundSize: "auto 90%"}} />

          {/* Cards stack */}
          <div ref={cardsRef} className="cards w-full md:w-10/12 max-w-[1500px] xl:w-11/12 h-[78vh] lg:h-[82lvh] relative rounded-[20px] overflow-hidden mr-0 ml-auto">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={cn(`card-${index + 1} absolute inset-0 w-full`, {
                  "top-[15px] h-[calc(100% - 15px)]": index === 1,
                  "top-[30px] h-[calc(100% - 30px)]": index === 2,
                  "top-[45px] h-[calc(100% - 45px)]": index === 3,
                  "top-[60px] h-[calc(100% - 60px)]": index === 4,
                })}
              >
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};