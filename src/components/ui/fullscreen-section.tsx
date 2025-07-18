import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface FullscreenSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  backgroundImage?: string;
  enableInternalScroll?: boolean;
}

export const FullscreenSection = ({ 
  children, 
  className = '', 
  id,
  backgroundImage,
  enableInternalScroll = false
}: FullscreenSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`scroll-section min-h-[100lvh] w-full relative overflow-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div
        ref={inViewRef}
        className={`h-full w-full ${enableInternalScroll ? 'overflow-y-auto' : 'overflow-hidden'}`}
        style={{ y, opacity }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};