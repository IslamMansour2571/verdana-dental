'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

const cases = [
  {
    id: 'makeover',
    title: 'Complete Smile Makeover',
    description: 'A transformative combination of porcelain veneers and professional whitening to achieve a natural, radiant smile.',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80',
  },
  {
    id: 'implant',
    title: 'Dental Implants',
    description: 'Restoring function and aesthetics with state-of-the-art dental implants that look and feel like natural teeth.',
    beforeImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80',
  },
  {
    id: 'ortho',
    title: 'Clear Aligner Therapy',
    description: 'Discreet and comfortable orthodontic treatment using clear aligners to perfectly align the bite and smile.',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1629909615957-be38d6c7fc9e?w=600&q=80',
  }
];

export default function SmileGallery() {
  const [activeCase, setActiveCase] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, handleMove]);

  const currentCase = cases[activeCase];

  return (
    <section className="py-20 sm:py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <div className="w-8 sm:w-12 h-px bg-terracotta"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-sage">Smile Transformations</h2>
            <div className="w-8 sm:w-12 h-px bg-terracotta"></div>
          </div>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            See the life-changing results achieved by our master ceramists and dental specialists. Every smile is uniquely designed to complement your facial features.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Case selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCase(idx);
                  setSliderPosition(50);
                }}
                className={`px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeCase === idx 
                    ? 'bg-terracotta text-white shadow-md' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 hover:text-sage'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Slider Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-xl cursor-ew-resize touch-none"
            ref={containerRef}
            onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
          >
            {/* After Image (Background) */}
            <Image
              src={currentCase.afterImage}
              alt={`${currentCase.title} — After treatment result`}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
              priority
            />
            
            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 z-10"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={currentCase.beforeImage}
                alt={`${currentCase.title} — Before treatment`}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>

            {/* Labels */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold text-sage shadow-sm pointer-events-none">
              Before
            </div>
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold text-sage shadow-sm pointer-events-none">
              After
            </div>

            {/* Divider */}
            <div 
              className="absolute top-0 bottom-0 z-30 w-0.5 sm:w-1 bg-white cursor-ew-resize transform -translate-x-1/2 shadow-[0_0_10px_rgba(0,0,0,0.3)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-neutral-100 text-sage transition-transform">
                <GripVertical className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl mx-auto px-4 sm:px-0"
          >
            <h3 className="text-xl sm:text-2xl font-display text-sage mb-2 sm:mb-3">{currentCase.title}</h3>
            <p className="text-neutral-600 text-sm sm:text-base">{currentCase.description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
