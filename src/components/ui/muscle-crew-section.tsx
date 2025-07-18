import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface MuscleCrewSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  backgroundImage?: string;
  cards: Array<{
    id: string | number;
    content: ReactNode;
  }>;
}

export const MuscleCrewSection = ({ 
  children, 
  className = '', 
  id,
  backgroundImage,
  cards
}: MuscleCrewSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isInCardScrolling, setIsInCardScrolling] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Calculate transforms for each card
  const cardTransforms = cards.map((_, index) => {
    const start = index / cards.length;
    const end = (index + 1) / cards.length;
    
    return {
      y: useTransform(scrollYProgress, [start, end], [100 * (cards.length - index - 1), 0]),
      opacity: useTransform(scrollYProgress, [start, end], [0.7, 1]),
      scale: useTransform(scrollYProgress, [start, end], [0.95, 1]),
      zIndex: cards.length - index
    };
  });

  // Header content animation
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const progress = latest;
      const newIndex = Math.min(Math.floor(progress * cards.length), cards.length - 1);
      setCurrentCardIndex(newIndex);
      setIsInCardScrolling(progress > 0.1 && progress < 0.9);
    });

    return unsubscribe;
  }, [scrollYProgress, cards.length]);

  return (
    <motion.section
      ref={containerRef}
      id={id}
      className={`scroll-section relative w-full ${className}`}
      style={{
        height: `${100 + (cards.length * 100)}vh`,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Sticky container for the entire section */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <motion.div
          ref={inViewRef}
          className="h-full w-full relative"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header section */}
          <motion.div
            className="absolute top-0 left-0 w-full z-30 py-[120px]"
            style={{ y: headerY, opacity: headerOpacity }}
          >
            {children}
          </motion.div>

          {/* Card stack container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-[1644px] h-[752px]">
              {/* Rotated AMBASSADOR text */}
              <div className="absolute top-[267px] left-[-218px] -rotate-90 [font-family:'Teko',Helvetica] font-medium text-black text-[150px] tracking-[0] leading-[normal] z-10">
                AMBASSADOR
              </div>

              {/* Cards container */}
              <div className="ml-36 w-[1500px] h-[752px] relative">
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      y: cardTransforms[index].y,
                      opacity: cardTransforms[index].opacity,
                      scale: cardTransforms[index].scale,
                      zIndex: cardTransforms[index].zIndex,
                    }}
                    initial={{ 
                      y: 100 * (cards.length - index - 1), 
                      opacity: 0.7, 
                      scale: 0.95 
                    }}
                  >
                    {card.content}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
            <div className="flex gap-3">
              {cards.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentCardIndex ? 'bg-[#fcff00]' : 'bg-gray-600'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: index === currentCardIndex ? 1.2 : 0.8 }}
                />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-800 rounded-full overflow-hidden z-40"
          >
            <motion.div
              className="h-full bg-[#fcff00] rounded-full origin-left"
              style={{ scaleX: scrollYProgress }}
              initial={{ scaleX: 0 }}
            />
          </motion.div>

          {/* Card counter */}
          <div className="absolute top-8 right-8 z-40">
            <div className="text-[#fcff00] font-bold text-xl">
              {String(currentCardIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};