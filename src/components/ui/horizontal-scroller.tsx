import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface HorizontalScrollerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const HorizontalScroller = ({ 
  children, 
  className = '', 
  speed = 1 
}: HorizontalScrollerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        animate={{ x: `${x}%` }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};