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
        style={{ x: `${x}%` }}
        className="flex whitespace-nowrap"
      >
        {children}
      </motion.div>
    </div>
  );
};