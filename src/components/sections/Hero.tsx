'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const headlineWords = "Your Smile, Reimagined.".split(" ");

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen pt-28 sm:pt-32 pb-20 sm:pb-28 flex items-center bg-gradient-to-b from-cream to-cream-dark overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Left Text Content */}
          <motion.div 
            className="w-full lg:w-[55%] flex flex-col justify-center relative z-20 text-center lg:text-left items-center lg:items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-sage leading-[1.1] tracking-tight mb-6 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 justify-center lg:justify-start">
              {headlineWords.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              variants={itemVariants}
              className="font-body text-base sm:text-lg md:text-xl text-neutral-600 max-w-xl mb-10 sm:mb-12 leading-relaxed"
            >
              Where advanced dental science meets personalized care. Experience dentistry that puts your comfort first.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto"
            >
              <a href="#booking" className="flex items-center justify-center gap-2.5 bg-terracotta hover:bg-terracotta-hover text-white px-8 py-4 rounded-full font-body font-semibold transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg text-base">
                Book Your Visit
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#services" className="flex items-center justify-center gap-2 bg-transparent border-2 border-sage text-sage hover:bg-sage hover:text-white px-8 py-4 rounded-full font-body font-semibold transition-all duration-300 text-base">
                Explore Services
              </a>
            </motion.div>
          </motion.div>

          {/* Right Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="w-full sm:w-[85%] md:w-[75%] lg:w-[45%] relative z-10 mb-16 lg:mb-0"
          >
            {/* Main Image Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/4] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-neutral-200">
              <motion.div 
                className="absolute inset-0 w-full h-[115%]"
                style={{ y: imageY }}
              >
                <Image 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                  alt="Modern dental clinic interior with natural light and state-of-the-art equipment"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 45vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 sm:-bottom-8 left-2 sm:left-0 md:-left-4 lg:-left-8 bg-white rounded-2xl p-4 sm:p-5 shadow-xl flex items-center gap-3 border border-neutral-100 z-20"
            >
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cream text-sage">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              </div>
              <div className="pr-2">
                <p className="font-display font-semibold text-sage text-base sm:text-lg md:text-xl leading-tight">
                  4.9 <span className="font-body text-neutral-400 font-normal mx-1">—</span>
                </p>
                <p className="font-body text-xs sm:text-sm text-neutral-600 font-medium">
                  2,400+ Happy Patients
                </p>
              </div>
            </motion.div>



          </motion.div>

        </div>
      </div>
    </section>
  );
}
