import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';

interface InternalScrollSectionProps {
  children: ReactNode;
  className?: string;
  scrollDirection?: 'horizontal' | 'vertical';
  scrollSpeed?: number;
  snapToElements?: boolean;
}

export const InternalScrollSection = ({ 
  children, 
  className = '', 
  scrollDirection = 'vertical',
  scrollSpeed = 1,
  snapToElements = false
}: InternalScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const transform = scrollDirection === 'horizontal' 
    ? useTransform(scrollYProgress, [0, 1], [0, -100 * scrollSpeed])
    : useTransform(scrollYProgress, [0, 1], [0, -50 * scrollSpeed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    const handleScroll = () => {
      if (isInView && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInView, hasScrolled]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
    >
      <motion.div
        ref={contentRef}
        className={`w-full h-full ${scrollDirection === 'horizontal' ? 'flex' : 'flex-col'}`}
        style={{
          x: scrollDirection === 'horizontal' ? `${transform}%` : 0,
          y: scrollDirection === 'vertical' ? `${transform}%` : 0,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};