'use client';

import { motion } from 'framer-motion';
import { Puzzle, Sparkles, AlignCenter, Shield, Gem, Stethoscope } from 'lucide-react';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

const services = [
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement that looks and feels natural. Our titanium implants integrate seamlessly with your jawbone.',
    icon: Puzzle,
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    description: 'Professional-grade whitening for a brighter, more confident smile in just one visit.',
    icon: Sparkles,
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description: 'Invisible aligners and modern braces for perfectly aligned teeth at any age.',
    icon: AlignCenter,
  },
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    description: 'Pain-free endodontic treatment using the latest microscopic technology.',
    icon: Shield,
  },
  {
    id: 'veneers',
    title: 'Cosmetic Veneers',
    description: 'Custom porcelain veneers crafted to transform your smile with natural-looking results.',
    icon: Gem,
  },
  {
    id: 'checkup',
    title: 'General Checkup',
    description: 'Comprehensive oral exams with digital imaging for proactive dental health.',
    icon: Stethoscope,
  },
];

export default function Services() {
  const handleLearnMore = (e: React.MouseEvent<HTMLAnchorElement>, serviceId: string) => {
    e.preventDefault();
    try {
      sessionStorage.setItem('preselectedServiceId', serviceId);
    } catch {
      // sessionStorage unavailable (e.g. private browsing) — booking section still opens normally
    }
    const target = document.getElementById('booking');
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 sm:mb-16 flex flex-col items-center sm:items-start text-center sm:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUpVariant}
        >
          <div className="w-10 h-0.5 bg-terracotta mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-sage mb-4">
            Our Expertise
          </h2>
          <p className="font-body text-neutral-600 max-w-2xl text-base sm:text-lg px-4 sm:px-0 leading-relaxed">
            Experience exceptional dental care with our comprehensive range of specialized treatments, tailored to your unique smile.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={fadeUpVariant}
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
                }}
                className="group bg-white rounded-2xl border border-neutral-300 p-6 sm:p-8 flex flex-col transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full flex items-center justify-center bg-cream-dark text-sage mb-5 sm:mb-6 transition-colors duration-300 group-hover:bg-sage group-hover:text-white">
                  <Icon size={24} />
                </div>
                <h4 className="font-display text-lg sm:text-xl text-sage mb-3">
                  {service.title}
                </h4>
                <p className="font-body text-neutral-600 mb-5 sm:mb-6 flex-grow text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <a
                    href="#booking"
                    onClick={(e) => handleLearnMore(e, service.id)}
                    aria-label={`Book an appointment for ${service.title}`}
                    className="text-terracotta font-body font-medium inline-flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 focus:opacity-100 focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded text-sm sm:text-base"
                  >
                    Learn More <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
