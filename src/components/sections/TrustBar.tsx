'use client';

import { motion, useInView, animate } from 'framer-motion';
import { Clock, Users, Award, Activity } from 'lucide-react';
import { useEffect, useRef } from 'react';

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{from}</span>;
}

export default function TrustBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const stats = [
    {
      icon: Clock,
      value: 15,
      suffix: '+',
      label: 'Years Experience',
    },
    {
      icon: Users,
      value: 2400,
      suffix: '+',
      label: 'Happy Patients',
    },
    {
      icon: Award,
      value: 12,
      suffix: '',
      label: 'Awards Won',
    },
    {
      icon: Activity,
      value: 8500,
      suffix: '+',
      label: 'Procedures',
    },
  ];

  return (
    <section className="bg-sage py-12 sm:py-16" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex flex-col items-center text-center ${
                  index !== stats.length - 1 ? 'md:border-r md:border-white/10' : ''
                }`}
              >
                <div className="mb-3 sm:mb-4">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-terracotta" />
                </div>
                
                <div className="flex items-baseline mb-2">
                  <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream">
                    <Counter from={0} to={stat.value} />
                  </span>
                  {stat.suffix && (
                    <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-cream">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                
                <p className="font-body text-cream/80 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
