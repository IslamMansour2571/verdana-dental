'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const hours = [
  { day: 'Monday', time: '8:00 AM - 6:00 PM' },
  { day: 'Tuesday', time: '8:00 AM - 6:00 PM' },
  { day: 'Wednesday', time: '8:00 AM - 6:00 PM' },
  { day: 'Thursday', time: '8:00 AM - 6:00 PM' },
  { day: 'Friday', time: '8:00 AM - 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM - 3:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export default function Contact() {
  const [currentDay, setCurrentDay] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  }, []);

  return (
    <section className="bg-cream-dark py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-px bg-terracotta w-12"></div>
            <span className="text-sm font-semibold tracking-widest text-terracotta uppercase">Location</span>
            <div className="h-px bg-terracotta w-12"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-sage">
            Visit Our Studio
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-10"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-display text-sage mb-6">Contact Info</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center shrink-0">
                  <MapPin className="text-cream w-5 h-5" />
                </div>
                <div className="pt-2">
                  <p className="font-body text-neutral-900 font-medium text-sm">Address</p>
                  <p className="font-body text-neutral-600 text-sm">245 Park Avenue, Suite 1200<br/>New York, NY 10167</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center shrink-0">
                  <Phone className="text-cream w-5 h-5" />
                </div>
                <div className="pt-2">
                  <p className="font-body text-neutral-900 font-medium text-sm">Phone</p>
                  <a href="tel:2125550147" className="font-body text-neutral-600 hover:text-terracotta transition-colors text-sm">(212) 555-0147</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center shrink-0">
                  <Mail className="text-cream w-5 h-5" />
                </div>
                <div className="pt-2">
                  <p className="font-body text-neutral-900 font-medium text-sm">Email</p>
                  <a href="mailto:hello@verdanadental.com" className="font-body text-neutral-600 hover:text-terracotta transition-colors text-sm">hello@verdanadental.com</a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-300">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-sage w-6 h-6" />
                <h3 className="text-2xl font-display text-sage">Working Hours</h3>
              </div>
              <ul className="space-y-2 font-body text-neutral-600">
                {hours.map((schedule) => (
                  <li 
                    key={schedule.day} 
                    className={`flex justify-between py-2.5 px-4 rounded-lg transition-colors text-sm ${
                      currentDay === schedule.day ? 'bg-sage/10 text-sage font-medium' : ''
                    }`}
                  >
                    <span>{schedule.day}</span>
                    <span className={schedule.time === 'Closed' ? 'text-terracotta font-medium' : ''}>{schedule.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-neutral-300 flex flex-col gap-4">
               <h3 className="text-xl font-display text-sage mb-2">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center text-sage hover:bg-sage hover:text-cream transition-all duration-300" aria-label="Instagram">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5"/></svg>
                </a>
                <a href="#" className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center text-sage hover:bg-sage hover:text-cream transition-all duration-300" aria-label="Facebook">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="w-11 h-11 rounded-full border border-neutral-300 flex items-center justify-center text-sage hover:bg-sage hover:text-cream transition-all duration-300" aria-label="Twitter">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1838862740894!2d-73.97309368459254!3d40.75543797932682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258ff1dc5d825%3A0xc2c0f16a4237db85!2s245%20Park%20Ave%2C%20New%20York%2C%20NY%2010167!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Verdana Dental Studio Location - 245 Park Avenue, New York"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
