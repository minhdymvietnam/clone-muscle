import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'parallax' | 'cards';
  direction?: 'up' | 'down' | 'left' | 'right';
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export const SectionWrapper = ({ 
  children, 
  className = '', 
  animationType = 'fade',
  direction = 'up',
  staggerChildren = false,
  staggerDelay = 0.1
}: SectionWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const progress = useSpring(scrollYProgress, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '-10% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getAnimationProps = () => {
    switch (animationType) {
      case 'slide':
        const slideDistance = direction === 'up' ? 100 : direction === 'down' ? -100 : 
                             direction === 'left' ? 100 : -100;
        return {
          initial: { 
            opacity: 0, 
            x: direction === 'left' || direction === 'right' ? slideDistance : 0,
            y: direction === 'up' || direction === 'down' ? slideDistance : 0
          },
          animate: isInView ? { opacity: 1, x: 0, y: 0 } : { 
            opacity: 0, 
            x: direction === 'left' || direction === 'right' ? slideDistance : 0,
            y: direction === 'up' || direction === 'down' ? slideDistance : 0
          },
          transition: { duration: 0.8, ease: "easeOut" }
        };
      
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
          transition: { duration: 0.6, ease: "easeOut" }
        };
      
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: 45, scale: 0.8 },
          animate: isInView ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: 45, scale: 0.8 },
          transition: { duration: 0.8, ease: "easeOut" }
        };
      
      case 'parallax':
        const y = useTransform(progress, [0, 1], [0, -50]);
        return {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : { opacity: 0 },
          style: { y },
          transition: { duration: 0.6, ease: "easeOut" }
        };
      
      case 'cards':
        return {
          initial: { opacity: 0, y: 60, rotateX: 45 },
          animate: isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: 45 },
          transition: { duration: 0.8, ease: "easeOut" }
        };
      
      default: // fade
        return {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.6, ease: "easeOut" }
        };
    }
  };

  const containerVariants = staggerChildren ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  } : {};

  const itemVariants = staggerChildren ? {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  } : {};

  const animationProps = getAnimationProps();

  return (
    <motion.div
      ref={ref}
      className={`w-full ${className}`}
      {...animationProps}
      variants={staggerChildren ? containerVariants : undefined}
      initial={staggerChildren ? "hidden" : animationProps.initial}
      animate={staggerChildren ? (isInView ? "visible" : "hidden") : animationProps.animate}
    >
      {staggerChildren ? (
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
};