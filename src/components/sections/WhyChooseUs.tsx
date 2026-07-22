'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const panels = [
  {
    id: 1,
    title: 'Advanced Technology',
    description: 'We utilize state-of-the-art dental equipment to ensure precise diagnostics and comfortable, minimally invasive treatments for all our patients.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    layout: 'left',
  },
  {
    id: 2,
    title: 'Compassionate Care',
    description: 'Our team takes the time to listen to your concerns, explaining every step of your treatment plan in a relaxing, stress-free environment.',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
    layout: 'right',
  },
  {
    id: 3,
    title: 'Exceptional Results',
    description: 'From routine cleanings to complex smile makeovers, we are dedicated to delivering beautiful, long-lasting results you can be proud to share.',
    image: 'https://images.unsplash.com/photo-1744723856265-866d19b9cf1a?w=800&q=80',
    layout: 'center',
  },
];

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function WhyChooseUs() {
  const mounted = useIsClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!mounted || typeof window === 'undefined' || window.innerWidth < 1024) return;

    const validPanels = panelsRef.current.filter(Boolean);
    const validDots = dotsRef.current.filter(Boolean);
    if (validPanels.length < 3 || validDots.length < 3) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
      },
    });

    // Initial state
    gsap.set(validPanels, { autoAlpha: 0, y: 50 });
    gsap.set(validPanels[0], { autoAlpha: 1, y: 0 });
    gsap.set(validDots, { backgroundColor: '#E5E0D8' });
    gsap.set(validDots[0], { backgroundColor: '#2D4A3E' });

    // Panel 1 to 2
    tl.to(validPanels[0], { autoAlpha: 0, y: -50, duration: 1 })
      .to(validDots[0], { backgroundColor: '#E5E0D8', duration: 0.5 }, '<')
      .to(validPanels[1], { autoAlpha: 1, y: 0, duration: 1 }, '<0.5')
      .to(validDots[1], { backgroundColor: '#2D4A3E', duration: 0.5 }, '<')
      
    // Panel 2 to 3
      .to(validPanels[1], { autoAlpha: 0, y: -50, duration: 1 })
      .to(validDots[1], { backgroundColor: '#E5E0D8', duration: 0.5 }, '<')
      .to(validPanels[2], { autoAlpha: 1, y: 0, duration: 1 }, '<0.5')
      .to(validDots[2], { backgroundColor: '#2D4A3E', duration: 0.5 }, '<');

  }, { dependencies: [mounted], scope: containerRef });

  if (!mounted) return null;

  return (
    <section className="bg-cream w-full relative">
      {/* Mobile view */}
      <div className="lg:hidden px-4 sm:px-6 py-20 sm:py-24 flex flex-col gap-12 sm:gap-16">
        <div className="text-center">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-px bg-terracotta w-12"></div>
            <span className="text-sm font-semibold tracking-widest text-terracotta uppercase">Why Us</span>
            <div className="h-px bg-terracotta w-12"></div>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-sage mb-4">Why Verdana Dental</h2>
        </div>
        {panels.map((panel) => (
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className={`flex flex-col gap-3 ${panel.layout === 'center' ? 'items-center text-center' : ''}`}>
              <h3 className="font-display text-2xl sm:text-3xl text-sage">{panel.title}</h3>
              <p className="font-body text-neutral-600 text-base sm:text-lg leading-relaxed">{panel.description}</p>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={panel.image}
                alt={`${panel.title} - Verdana Dental Studio`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop view */}
      <div ref={containerRef} className="hidden lg:flex h-screen w-full relative overflow-hidden bg-cream items-center justify-center">
        {/* Progress indicator */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-10 z-20">
          <div className="absolute w-[2px] h-full bg-neutral-300 left-1/2 -translate-x-1/2 z-0" />
          {panels.map((_, i) => (
            <div
              key={`dot-${i}`}
              ref={(el) => { dotsRef.current[i] = el; }}
              className="w-4 h-4 rounded-full bg-neutral-300 z-10 relative shadow-sm"
            />
          ))}
        </div>

        <div className="max-w-7xl w-full mx-auto px-24 h-full relative flex flex-col justify-center">
          <h2 className="absolute top-16 left-24 font-display text-5xl text-sage z-20">Why Verdana Dental</h2>
          
          <div className="relative w-full h-[60vh] mt-16">
            {panels.map((panel, i) => (
              <div
                key={panel.id}
                ref={(el) => { panelsRef.current[i] = el; }}
                className="absolute inset-0 w-full h-full flex items-center"
              >
                {panel.layout === 'left' && (
                  <div className="flex w-full gap-16 items-center">
                    <div className="flex-1 pr-12">
                      <h3 className="font-display text-5xl text-sage mb-6">{panel.title}</h3>
                      <p className="font-body text-neutral-600 text-xl leading-relaxed">{panel.description}</p>
                    </div>
                    <div className="flex-1 relative h-[50vh] rounded-3xl overflow-hidden shadow-xl">
                      <Image src={panel.image} alt={`${panel.title} - Verdana Dental`} fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                )}
                
                {panel.layout === 'right' && (
                  <div className="flex w-full gap-16 items-center flex-row-reverse">
                    <div className="flex-1 pl-12">
                      <h3 className="font-display text-5xl text-sage mb-6">{panel.title}</h3>
                      <p className="font-body text-neutral-600 text-xl leading-relaxed">{panel.description}</p>
                    </div>
                    <div className="flex-1 relative h-[50vh] rounded-3xl overflow-hidden shadow-xl">
                      <Image src={panel.image} alt={`${panel.title} - Verdana Dental`} fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                )}

                {panel.layout === 'center' && (
                  <div className="flex flex-col w-full h-full items-center justify-center text-center">
                    <div className="max-w-3xl mb-12">
                      <h3 className="font-display text-5xl text-sage mb-6">{panel.title}</h3>
                      <p className="font-body text-neutral-600 text-xl leading-relaxed">{panel.description}</p>
                    </div>
                    <div className="w-[80%] relative h-[45vh] rounded-3xl overflow-hidden shadow-xl">
                      <Image src={panel.image} alt={`${panel.title} - Verdana Dental`} fill sizes="(max-width: 1024px) 100vw, 80vw" style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
