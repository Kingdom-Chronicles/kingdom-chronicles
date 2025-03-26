import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls, useDragControls } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "./constants/testimonials";

const SCROLL_DURATION = 80;
const CARD_WIDTH = 300;
const GAP = 32; // 8 * 4 (gap-8 in Tailwind)

export const ScrollingTestimonialCarousel: React.FC = () => {
  const controls = useAnimationControls();
  const dragControls = useDragControls();
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const startAnimation = async () => {
      await controls.start({
        x: "-50%",
        transition: {
          duration: SCROLL_DURATION,
          ease: "linear",
          repeat: Infinity,
        },
      });
    };

    if (!isHovered) {
      startAnimation();
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    const moveThreshold = CARD_WIDTH / 4;
    if (Math.abs(info.offset.x) > moveThreshold) {
      const direction = info.offset.x > 0 ? -1 : 1;
      moveCarousel(direction);
    }
  };

  const moveCarousel = (index: number) => {
    setCurrentIndex(index);
    controls.start({
      x: `${-index * (CARD_WIDTH + GAP)}px`,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });
  };

  return (
    <div className="relative w-full">
      <div 
        ref={containerRef}
        className="overflow-hidden w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-8"
          animate={controls}
          drag="x"
          dragControls={dragControls}
          dragConstraints={containerRef}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{
            width: "fit-content",
            x: "0%",
            cursor: isHovered ? "grab" : "auto"
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
              theme={theme}
            />
          ))}
        </motion.div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => moveCarousel(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 mx-1 ${
              currentIndex === index 
                ? 'bg-indigo-600 w-4' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};