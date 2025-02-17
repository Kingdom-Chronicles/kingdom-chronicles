import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls, useDragControls, PanInfo } from "framer-motion";

interface Testimonial {
  name: string;
  feedback: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Denise Rwabwera",
    feedback: "Kingdom Chronicles has deepened my understanding of the Bible in a fun and engaging way!",
    avatar: "/denise.jpg"
  },
  {
    name: "Joshua Kalange",
    feedback: "I love playing the mini-games with my friends. It's such a unique and enjoyable experience!",
    avatar: "/joshua.jpg"
  },
  {
    name: "Akol Evangeline Johnson",
    feedback: "The challenges are amazing, and the leaderboard keeps me motivated to keep playing!",
    avatar: "/akol.jpg"
  },
  {
    name: "Alvin Nuwahwera",
    feedback: "Kingdom Chronicles pushed me out of my comfort zone! Need to read more! 📖✨",
    avatar: "/alvin.jpg"
  },
  {
    name: "Agatha Rachael Akullu",
    feedback: "Kingdom Chronicles transformed my faith—challenged me to read more and grow spiritually! 🙏✨",
    avatar: "/agatha.jpg"
  }
];

const SCROLL_DURATION = 80;
const CARD_WIDTH = 300;
const GAP = 32; // 8 * 4 (gap-8 in Tailwind)

export const ScrollingTestimonialCarousel: React.FC = () => {
  const controls = useAnimationControls();
  const dragControls = useDragControls();
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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
            />
          ))}
        </motion.div>
      </div>

      {/* Dots Navigation (Moved below the testimonials) */}
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

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
  <div 
    className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md
                transition-colors duration-200" 
    style={{ width: '300px' }}
  >
    <img
      src={testimonial.avatar}
      alt={`${testimonial.name}'s avatar`}
      className="w-16 h-16 rounded-full mb-4 object-cover ring-2 ring-gray-200 dark:ring-gray-600"
    />
    <p className="text-sm italic mb-4 text-gray-700 dark:text-gray-200">"{testimonial.feedback}"</p>
    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">- {testimonial.name}</p>
  </div>
);
