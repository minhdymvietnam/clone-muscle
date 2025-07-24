import { useCallback } from 'react';

export const useSmoothScrollToCenter = () => {
  const scrollToCenter = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    const elementRect = element.getBoundingClientRect();
    const elementTop = elementRect.top + window.pageYOffset;
    const elementHeight = elementRect.height;
    const windowHeight = window.innerHeight;

    // Calculate position to center the element on screen
    const centerPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);

    window.scrollTo({
      top: Math.max(0, centerPosition), // Prevent negative scroll
      behavior: 'smooth'
    });
  }, []);

  const scrollToElementById = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    scrollToCenter(element);
  }, [scrollToCenter]);

  const scrollToElementByRef = useCallback((ref: React.RefObject<HTMLElement>) => {
    scrollToCenter(ref.current);
  }, [scrollToCenter]);

  return {
    scrollToCenter,
    scrollToElementById,
    scrollToElementByRef
  };
};