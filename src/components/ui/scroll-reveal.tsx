import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: number;
}

export const ScrollReveal = ({ 
  children, 
  className = '', 
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 100
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"]
  });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return {
          y: useTransform(scrollYProgress, [0, 1], [distance, 0]),
          opacity: useTransform(scrollYProgress, [0, 1], [0, 1])
        };
      case 'down':
        return {
          y: useTransform(scrollYProgress, [0, 1], [-distance, 0]),
          opacity: useTransform(scrollYProgress, [0, 1], [0, 1])
        };
      case 'left':
        return {
          x: useTransform(scrollYProgress, [0, 1], [distance, 0]),
          opacity: useTransform(scrollYProgress, [0, 1], [0, 1])
        };
      case 'right':
        return {
          x: useTransform(scrollYProgress, [0, 1], [-distance, 0]),
          opacity: useTransform(scrollYProgress, [0, 1], [0, 1])
        };
      case 'scale':
        return {
          scale: useTransform(scrollYProgress, [0, 1], [0.8, 1]),
          opacity: useTransform(scrollYProgress, [0, 1], [0, 1])
        };
      case 'rotate':
        return {
          rotate: useTransform(scrollYProgress, [0, 1], [45, 0]),
          opacity: useTransform(scrollYProgress, [0, 1], [0, 1])
        };
      default:
        return {
          y: useTransform(scrollYProgress, [0, 1], [distance, 0]),
          opacity: useTransform(scrollYProgress, [0, 1], [0, 1])
        };
    }
  };

  const transforms = getTransform();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={transforms}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};