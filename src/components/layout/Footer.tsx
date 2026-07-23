'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

/* Brand icons removed from lucide-react — using inline SVGs */
const SocialIcon = ({ d, label }: { d: string; label: string }) => (
  <a href="#" className="p-2 bg-cream/10 rounded-full hover:bg-terracotta transition-colors duration-300" aria-label={label}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage text-cream pt-14 sm:pt-16 pb-8 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8 mb-12 sm:mb-16">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 inline-block">
              <span className="font-display text-3xl font-semibold tracking-tight text-cream">
                Verdana
              </span>
            </Link>
            <p className="text-cream/80 text-sm leading-relaxed max-w-sm">
              Premium dental care in a relaxing environment. We combine advanced technology with a gentle touch to bring you your best smile.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <SocialIcon label="Instagram" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2ZM16 11.37a4 4 0 1 1-4.73-4.73 4 4 0 0 1 4.73 4.73ZM17.5 6.5h.01" />
              <SocialIcon label="Facebook" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              <SocialIcon label="Twitter" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              <SocialIcon label="LinkedIn" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-display text-xl mb-6 text-cream">Services</h3>
            <ul className="flex flex-col gap-3">
              {['General Dentistry', 'Cosmetic Dentistry', 'Orthodontics', 'Dental Implants', 'Teeth Whitening', 'Pediatric Dentistry'].map((service) => (
                <li key={service}>
                  <Link href="#services" className="text-cream/80 hover:text-white hover:pl-2 transition-all duration-300 text-sm">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="font-display text-xl mb-6 text-cream">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {['About Us', 'Our Team', 'Patient Gallery', 'FAQ', 'Dental Blog', 'Careers'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-cream/80 hover:text-white hover:pl-2 transition-all duration-300 text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact — matches Contact section info */}
          <div>
            <h3 className="font-display text-xl mb-6 text-cream">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-cream/80">
                <MapPin size={18} className="mt-0.5 shrink-0 text-terracotta" />
                <span>245 Park Avenue, Suite 1200<br />New York, NY 10167</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/80">
                <Phone size={18} className="shrink-0 text-terracotta" />
                <a href="tel:2125550147" className="text-cream/80 hover:text-white transition-colors">(212) 555-0147</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/80">
                <Mail size={18} className="shrink-0 text-terracotta" />
                <a href="mailto:hello@verdanadental.com" className="text-cream/80 hover:text-white transition-colors">hello@verdanadental.com</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-cream/80 mt-2">
                <Clock size={18} className="mt-0.5 shrink-0 text-terracotta" />
                <span>Mon-Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 3:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/80">
          <p>&copy; {currentYear} Verdana Dental Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-cream/80 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-cream/80 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
