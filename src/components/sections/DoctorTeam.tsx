'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/animations';

const doctors = [
  {
    id: 1,
    name: 'Dr. Samuel Mitchell',
    specialty: 'Cosmetic Dentistry',
    credentials: 'DDS, FAACD',
    bio: 'Specializing in transformative smile makeovers and advanced porcelain veneers.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  },
  {
    id: 2,
    name: 'Dr. James Chen',
    specialty: 'Oral Surgery',
    credentials: 'DMD, MD',
    bio: 'Expert in dental implants and complex extractions with a focus on patient comfort.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  },
  {
    id: 3,
    name: 'Dr. Ahmad Okafor',
    specialty: 'Orthodontics',
    credentials: 'DDS, MS',
    bio: 'Creating beautiful, aligned smiles using the latest invisible aligner technology.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80',
    social: {
      linkedin: '#',
      twitter: '#',
    }
  }
];

export default function DoctorTeam() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-terracotta"></div>
            <span className="text-terracotta font-medium uppercase tracking-wider text-sm">
              Our Experts
            </span>
            <div className="h-px w-12 bg-terracotta"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-sage mb-4 sm:mb-6">
            Meet Our Doctors
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg md:text-xl font-body px-4 sm:px-0">
            Our team of specialists combines decades of experience with a gentle touch to provide you with world-class dental care.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-start"
        >
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              variants={fadeUp}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group ${
                index === 2 ? 'sm:col-span-2 sm:max-w-sm sm:mx-auto md:col-span-1 md:max-w-none' : ''
              }`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={`${doctor.name} - ${doctor.specialty} specialist at Verdana Dental Studio`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-sage/60 opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-4">
                  <a href={doctor.social.linkedin} aria-label={`${doctor.name} LinkedIn profile`} className="bg-white p-3 rounded-full text-sage hover:text-terracotta transition-colors shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href={doctor.social.twitter} aria-label={`${doctor.name} Twitter profile`} className="bg-white p-3 rounded-full text-sage hover:text-terracotta transition-colors shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-7 text-center flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-display text-sage mb-2">
                  {doctor.name}
                </h3>
                <p className="text-terracotta font-medium mb-3 text-sm sm:text-base">
                  {doctor.specialty}
                </p>
                <span className="inline-block px-3 py-1 bg-cream-dark text-sage-light text-xs font-bold rounded-full tracking-wider mb-4">
                  {doctor.credentials}
                </span>
                <div className="flex sm:hidden items-center gap-3 mb-4">
                  <a href={doctor.social.linkedin} aria-label={`${doctor.name} LinkedIn profile`} className="bg-cream-dark p-2.5 rounded-full text-sage hover:text-terracotta transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href={doctor.social.twitter} aria-label={`${doctor.name} Twitter profile`} className="bg-cream-dark p-2.5 rounded-full text-sage hover:text-terracotta transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                </div>
                <p className="text-neutral-600 font-body text-sm leading-relaxed">
                  {doctor.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
