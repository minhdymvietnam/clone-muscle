import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SimpleCardStackProps {
  children: ReactNode;
  className?: string;
  id?: string;
  backgroundImage?: string;
  cards: Array<{
    id: string | number;
    content: ReactNode;
  }>;
  nextSectionId?: string;
  prevSectionId?: string;
}

export const SimpleCardStack = ({
                                  children,
                                  className = '',
                                  id,
                                  backgroundImage,
                                  cards,
                                  nextSectionId = 'movie',
                                  prevSectionId = 'good-points'
                                }: SimpleCardStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isFromTop, setIsFromTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    console.log(container)
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Better direction detection
          const containerTop = entry.target.getBoundingClientRect().top;
          const fromTop = containerTop < window.innerHeight * 0.3;

          setIsFromTop(fromTop);
          setCurrentIndex(fromTop ? cards.length - 1 : 0);
          setIsLocked(true);

          // Disable scrolling
          document.body.style.overflow = 'hidden';

          // Disable GSAP smooth scroll if available
          const gsapSmoother = (window as any).gsapSmoother;
          if (gsapSmoother) gsapSmoother.paused(true);

          console.log('🔒 Section locked, fromTop:', fromTop, 'startIndex:', fromTop ? cards.length - 1 : 0);
        } else {
          setIsLocked(false);

          // Re-enable scrolling
          document.body.style.overflow = '';

          // Re-enable GSAP smooth scroll if available
          const gsapSmoother = (window as any).gsapSmoother;
          if (gsapSmoother) gsapSmoother.paused(false);

          console.log('🔓 Section unlocked');
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(container);

    const handleWheel = (e: WheelEvent) => {
      if (!isLocked || isScrolling) return;

      e.preventDefault();
      e.stopPropagation();

      setIsScrolling(true);

      const delta = e.deltaY > 0 ? 1 : -1;
      console.log('🎯 Wheel delta:', delta, 'currentIndex:', currentIndex, 'isFromTop:', isFromTop);

      if (isFromTop) {
        // Reverse navigation
        if (delta > 0 && currentIndex > 0) {
          console.log('⬆️ Moving to previous card (reverse)');
          setCurrentIndex(prev => prev - 1);
        } else if (delta < 0 && currentIndex < cards.length - 1) {
          console.log('⬇️ Moving to next card (reverse)');
          setCurrentIndex(prev => prev + 1);
        } else if (delta > 0 && currentIndex === 0) {
          console.log('🚀 Exiting to next section');
          exitToSection(nextSectionId);
        } else if (delta < 0 && currentIndex === cards.length - 1) {
          console.log('🚀 Exiting to previous section');
          exitToSection(prevSectionId);
        }
      } else {
        // Normal navigation
        if (delta > 0 && currentIndex < cards.length - 1) {
          console.log('⬇️ Moving to next card');
          setCurrentIndex(prev => prev + 1);
        } else if (delta < 0 && currentIndex > 0) {
          console.log('⬆️ Moving to previous card');
          setCurrentIndex(prev => prev - 1);
        } else if (delta > 0 && currentIndex === cards.length - 1) {
          console.log('🚀 Exiting to next section');
          exitToSection(nextSectionId);
        } else if (delta < 0 && currentIndex === 0) {
          console.log('🚀 Exiting to previous section');
          exitToSection(prevSectionId);
        }
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    };

    const exitToSection = (sectionId: string) => {
      setIsLocked(false);
      document.body.style.overflow = '';

      const gsapSmoother = (window as any).gsapSmoother;
      if (gsapSmoother) gsapSmoother.paused(false);

      setTimeout(() => {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          if (gsapSmoother) {
            gsapSmoother.scrollTo(targetSection);
          } else {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel, true);
      document.body.style.overflow = '';

      const gsapSmoother = (window as any).gsapSmoother;
      if (gsapSmoother) gsapSmoother.paused(false);
    };
  }, [cards.length, currentIndex, isLocked, isFromTop, isScrolling, nextSectionId, prevSectionId]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full h-screen overflow-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-30 py-[120px]">
        {children}
      </div>

      {/* Cards */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-[1644px] h-[752px]">
          {/* AMBASSADOR text */}
          <div className="absolute top-[267px] left-[-218px] -rotate-90 [font-family:'Teko',Helvetica] font-medium text-black text-[150px] tracking-[0] leading-[normal] z-10">
            AMBASSADOR
          </div>

          {/* Card container */}
          <div className="ml-36 w-[1500px] h-[752px] relative">
            {cards.map((card, index) => {
              let visible, zIndex, translateY, scale;

              if (isFromTop) {
                visible = index >= currentIndex;
                zIndex = index;
                translateY = visible ? (currentIndex - index) * 15 : -50;
                scale = index === currentIndex ? 1 : 0.98;
              } else {
                visible = index <= currentIndex;
                zIndex = cards.length - index;
                translateY = visible ? (index - currentIndex) * 15 : 50;
                scale = index === currentIndex ? 1 : 0.98;
              }

              return (
                <motion.div
                  key={card.id}
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex }}
                  animate={{
                    y: translateY,
                    opacity: visible ? 1 : 0,
                    scale: scale,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {card.content}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#fcff00] scale-125' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Debug Info */}
      <div className="absolute top-8 left-8 z-40 text-white bg-black/50 p-2 rounded text-sm">
        <div>Index: {currentIndex}</div>
        <div>Locked: {isLocked ? 'Yes' : 'No'}</div>
        <div>From Top: {isFromTop ? 'Yes' : 'No'}</div>
        <div>Scrolling: {isScrolling ? 'Yes' : 'No'}</div>
      </div>

      {/* Counter */}
      <div className="absolute top-8 right-8 z-40 text-[#fcff00] font-bold text-lg">
        {String(currentIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
      </div>
    </div>
  );
};