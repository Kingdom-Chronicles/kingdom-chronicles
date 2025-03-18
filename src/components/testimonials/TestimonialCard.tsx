import React from "react";
import type { Theme } from "../ui/ThemeSelector";
import type { Testimonial } from "./constants/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  theme: Theme;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, theme }) => {
  const getBackgroundColor = () => {
    switch (theme) {
      case 'night':
        return 'bg-gray-800';
      case 'classic':
      case 'default':
      default:
        return 'bg-white';
    }
  };

  const getTextColor = () => {
    switch (theme) {
      case 'night':
        return 'text-gray-200';
      case 'classic':
      case 'default':
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div 
      className={`flex flex-col items-center p-6 rounded-lg shadow-md transition-colors duration-200 ${getBackgroundColor()}`}
      style={{ width: '300px' }}
    >
      <img
        src={testimonial.avatar}
        alt={`${testimonial.name}'s avatar`}
        className="w-16 h-16 rounded-full mb-4 object-cover ring-2 ring-gray-200"
      />
      <p className={`text-sm italic mb-4 ${getTextColor()}`}>
        "{testimonial.feedback}"
      </p>
      <p className={`text-xs font-semibold ${getTextColor()}`}>
        - {testimonial.name}
      </p>
    </div>
  );
};