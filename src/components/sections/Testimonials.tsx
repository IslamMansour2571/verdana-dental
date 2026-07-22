'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Marcus S.',
    procedure: 'Invisalign Treatment',
    quote: "The team at Verdana Dental Studio made my Invisalign journey incredibly smooth. Not only are the results amazing, but the level of care and attention to detail during every visit was truly exceptional.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: 2,
    name: 'James R.',
    procedure: 'Dental Implants',
    quote: "I was nervous about getting implants, but the entire process was painless and professional. The state-of-the-art facility and Dr. Chen's expertise put me completely at ease.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 3,
    name: 'Patrick K.',
    procedure: 'Teeth Whitening',
    quote: "I came in for a whitening treatment before my wedding, and the results exceeded my expectations. The clinic feels more like a spa than a dental office!",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  },
  {
    id: 4,
    name: 'Michael T.',
    procedure: 'Routine Care',
    quote: "I've been a patient for three years. The preventive care approach here is fantastic, and the hygienists are the gentlest I've ever experienced.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    id: 5,
    name: 'Steven L.',
    procedure: 'Cosmetic Dentistry',
    quote: "My veneer consultation was incredibly thorough. They took the time to understand exactly what I wanted, and the final result is a natural, beautiful smile.",
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 80 : -80,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        paginate(1);
      }, 5000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex, paginate]);

  return (
    <section className="py-20 sm:py-24 bg-cream relative overflow-hidden" id="testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="w-12 h-1 bg-terracotta mb-6 rounded-full"></div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-sage mb-4">What Our Patients Say</h2>
          <p className="font-body text-neutral-600 max-w-2xl text-base sm:text-lg px-4 sm:px-0 leading-relaxed">
            Don&apos;t just take our word for it. Read about the experiences of our valued patients and the life-changing results they&apos;ve achieved.
          </p>
        </div>

        <div 
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[420px] sm:min-h-[380px] md:min-h-[340px] flex items-center justify-center px-10 sm:px-14 md:px-16">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md flex flex-col items-center text-center relative">
                  <span className="text-5xl sm:text-6xl text-terracotta opacity-20 absolute top-3 sm:top-4 left-4 sm:left-6 font-display select-none">&ldquo;</span>
                  
                  <div className="flex space-x-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-terracotta text-terracotta" />
                    ))}
                  </div>
                  
                  <p className="text-base sm:text-lg md:text-xl text-neutral-700 font-body mb-6 sm:mb-8 italic relative z-10 leading-relaxed">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </p>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden mb-3 sm:mb-4 relative ring-2 ring-cream-dark">
                      <Image 
                        src={testimonials[currentIndex].photo} 
                        alt={`${testimonials[currentIndex].name} - ${testimonials[currentIndex].procedure} patient`}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </div>
                    <h4 className="font-display font-bold text-lg sm:text-xl text-sage">{testimonials[currentIndex].name}</h4>
                    <p className="text-xs sm:text-sm text-terracotta font-medium mt-1">{testimonials[currentIndex].procedure}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md text-sage hover:text-terracotta hover:scale-110 transition-all z-20 border border-neutral-100"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md text-sage hover:text-terracotta hover:scale-110 transition-all z-20 border border-neutral-100"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex justify-center space-x-2.5 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-terracotta scale-125' : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
