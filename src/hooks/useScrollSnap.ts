import { useEffect, useRef } from 'react';

export const useScrollSnap = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling = false;
    let currentSection = 0;
    const sections = container.querySelectorAll('.scroll-section');

    const scrollToSection = (index: number) => {
      if (index >= 0 && index < sections.length) {
        const targetSection = sections[index] as HTMLElement;
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        currentSection = index;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      isScrolling = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSection + direction;

      if (nextSection >= 0 && nextSection < sections.length) {
        scrollToSection(nextSection);
      }

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return scrollContainerRef;
};