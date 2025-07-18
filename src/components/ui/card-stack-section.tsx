import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';

interface CardStackSectionProps {
  children: ReactNode;
  className?: string;
  cards: Array<{
    id: string | number;
    content: ReactNode;
  }>;
  cardHeight?: number;
  stackOffset?: number;
}

export const CardStackSection = ({ 
  children, 
  className = '', 
  cards,
  cardHeight = 752,
  stackOffset = 100
}: CardStackSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isScrollingCards, setIsScrollingCards] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Calculate the total scroll distance needed for all cards
  const totalScrollDistance = cards.length * stackOffset;
  
  // Create transforms for each card
  const cardTransforms = cards.map((_, index) => {
    const start = index / cards.length;
    const end = (index + 1) / cards.length;
    
    return {
      y: useTransform(scrollYProgress, [start, end], [stackOffset * (cards.length - index), 0]),
      opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
      scale: useTransform(scrollYProgress, [start, end], [0.9, 1]),
      zIndex: index
    };
  });

  // Main content position (fixed during card scrolling)
  const mainContentY = useTransform(scrollYProgress, [0, 1], [0, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrollingCards(true);
        isScrolling = true;
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrollingCards(false);
        isScrolling = false;
      }, 150);

      // Update current card index based on scroll progress
      const progress = scrollYProgress.get();
      const newIndex = Math.min(Math.floor(progress * cards.length), cards.length - 1);
      setCurrentCardIndex(newIndex);
    };

    const unsubscribe = scrollYProgress.on('change', handleScroll);

    return () => {
      unsubscribe();
      clearTimeout(scrollTimeout);
    };
  }, [scrollYProgress, cards.length]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`}
      style={{ height: `${100 + (cards.length * 100)}vh` }}
    >
      {/* Fixed main content */}
      <motion.div
        className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden"
        style={{ y: mainContentY }}
      >
        {/* Header content */}
        <div className="relative z-20 w-full">
          {children}
        </div>

        {/* Card stack container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-[1502px]">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="absolute inset-0 w-full"
                style={{
                  y: cardTransforms[index].y,
                  opacity: cardTransforms[index].opacity,
                  scale: cardTransforms[index].scale,
                  zIndex: cardTransforms[index].zIndex,
                }}
                initial={{ y: stackOffset * (cards.length - index), opacity: 0, scale: 0.9 }}
              >
                {card.content}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex gap-2">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentCardIndex ? 'bg-[#fcff00]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gray-800 rounded-full overflow-hidden z-30"
        >
          <motion.div
            className="h-full bg-[#fcff00] rounded-full"
            style={{ scaleX: scrollYProgress }}
            initial={{ scaleX: 0 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};