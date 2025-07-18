import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useGSAP = () => {
  useEffect(() => {
    // Create ScrollSmoother for smooth scrolling
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    // Store smoother globally for access from other components
    (window as any).gsapSmoother = smoother;

    return () => {
      smoother?.kill();
      ScrollTrigger.killAll();
      (window as any).gsapSmoother = null;
    };
  }, []);
};