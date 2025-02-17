import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

const NORMAL_SPEED = 80;
const SLOW_SPEED =  80;
const RESET_DELAY = 5000;

export const ScrollingTestimonialCarousel: React.FC = () => {
  const [duration, setDuration] = useState(NORMAL_SPEED);

  const handleTestimonialClick = () => {
    setDuration(SLOW_SPEED);
    setTimeout(() => setDuration(NORMAL_SPEED), RESET_DELAY);
  };

  useEffect(() => {
    const resetCarousel = () => {
      const container = document.getElementById("testimonials-container");
      if (!container) return;

      container.style.transition = "none";
      container.style.transform = "translateX(0)";
      
      // Force reflow
      container.offsetHeight;
      
      container.style.transition = "transform 0.15s linear";
    };

    const interval = setInterval(resetCarousel, duration * 1000);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="overflow-hidden w-full">
    <motion.div
      className="flex gap-8"
      animate={{
        x: ["0%", "-50%"],
      }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      }}
      style={{
        width: "fit-content"
      }}
    >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
            onClick={handleTestimonialClick}
          />
        ))}
      </motion.div>
    </div>
  );
};

interface TestimonialCardProps {
    testimonial: Testimonial;
    onClick: () => void;
  }
  
  const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, onClick }) => (

      <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md
                      transition-colors duration-200" onClick={onClick} style={{ width: '300px' }}>
      
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name}'s avatar`}
          className="w-16 h-16 rounded-full mb-4 object-cover ring-2 ring-gray-200 dark:ring-gray-600"
        />
        <p className="text-sm italic mb-4 text-gray-700 dark:text-gray-200">"{testimonial.feedback}"</p>
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">- {testimonial.name}</p>
      </div>
);