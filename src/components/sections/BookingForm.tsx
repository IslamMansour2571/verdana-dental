'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Sparkles, 
  Smile, 
  Stethoscope, 
  Activity, 
  Syringe, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Check,
  Heart
} from 'lucide-react';

const SERVICES = [
  { id: 'implants', name: 'Dental Implants', icon: Syringe },
  { id: 'whitening', name: 'Teeth Whitening', icon: Sparkles },
  { id: 'orthodontics', name: 'Orthodontics', icon: Smile },
  { id: 'root-canal', name: 'Root Canal', icon: Activity },
  { id: 'veneers', name: 'Cosmetic Veneers', icon: Heart },
  { id: 'checkup', name: 'General Checkup', icon: Stethoscope },
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', 
  '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

type FormData = {
  serviceId: string;
  date: Date | null;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  
  const [formData, setFormData] = useState<FormData>({
    serviceId: '',
    date: null,
    timeSlot: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<{name?: string; email?: string; phone?: string}>({});
  const [isCalendarLoading, setIsCalendarLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 1)); // Defaulting to July 2026 based on requirements
  const today = new Date(2026, 6, 20); // Current date reference

  useEffect(() => {
    if (step === 2 && isCalendarLoading) {
      const timer = setTimeout(() => setIsCalendarLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [step, isCalendarLoading]);

  const updateFormData = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors when typing
    if (['name', 'email', 'phone'].includes(field)) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep3 = () => {
    const errors: {name?: string; email?: string; phone?: string} = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    const phoneRegex = /^[\d\s\-\+\(\)]{7,15}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !formData.serviceId) return;
    if (step === 2 && (!formData.date || !formData.timeSlot)) return;
    if (step === 3 && !validateStep3()) return;
    
    if (step === 3) {
      submitForm();
    } else {
      setDirection(1);
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };

  const submitForm = () => {
    setIsSuccess(true);
  };

  const resetForm = () => {
    setFormData({
      serviceId: '',
      date: null,
      timeSlot: '',
      name: '',
      email: '',
      phone: '',
      notes: '',
    });
    setStep(1);
    setDirection(1);
    setIsSuccess(false);
    setIsCalendarLoading(true);
  };

  // Calendar Helpers
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => {
    // 0 = Sunday, 1 = Monday, etc. Adjusting to make Monday = 0
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; 
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const blanks = Array.from({ length: firstDay }, (_, i) => <div key={`blank-${i}`} className="h-10" />);
    
    const dayElements = Array.from({ length: days }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day);
      
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSelected = formData.date?.toDateString() === date.toDateString();

      return (
        <button
          key={`day-${day}`}
          disabled={isPast}
          onClick={() => updateFormData('date', date)}
          className={`
            h-10 w-full rounded-full flex items-center justify-center text-sm transition-colors
            ${isPast ? 'text-neutral-300 cursor-not-allowed' : 'hover:bg-neutral-100 text-neutral-900'}
            ${isSelected ? '!bg-terracotta text-white font-medium shadow-md' : ''}
          `}
        >
          {day}
        </button>
      );
    });

    return [...blanks, ...dayElements];
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '10%' : '-10%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '10%' : '-10%',
      opacity: 0
    })
  };

  return (
    <section className="py-20 sm:py-24 bg-cream-dark flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-1 bg-sage mx-auto mb-6 rounded-full"></div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-sage mb-3 sm:mb-4">Book Your Appointment</h2>
          <p className="text-neutral-600 font-body text-sm sm:text-base">Schedule your visit with our expert dental team today.</p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden p-5 sm:p-8 md:p-12 min-h-[520px] sm:min-h-[600px] flex flex-col relative">
          
          {/* Progress Indicator */}
          {!isSuccess && (
            <div className="flex justify-center items-center mb-10 px-4">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300
                    ${step >= s ? 'bg-terracotta text-white shadow-md' : 'bg-neutral-100 text-neutral-400'}
                  `}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`
                      h-1 w-16 mx-2 rounded-full transition-colors duration-300
                      ${step > s ? 'bg-terracotta/50' : 'bg-neutral-100'}
                    `} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Form Content Area */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-24 h-24 bg-sage-light/10 text-sage rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h3 className="font-display text-3xl text-sage mb-2">Booking Confirmed!</h3>
                  <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                    We will contact you shortly to confirm your appointment details.
                  </p>
                  
                  <div className="bg-neutral-50 rounded-2xl p-6 w-full max-w-md text-left mb-8 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="font-medium text-neutral-900 w-20">Service:</span>
                      <span className="text-neutral-600">{SERVICES.find(s => s.id === formData.serviceId)?.name}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-medium text-neutral-900 w-20">Date:</span>
                      <span className="text-neutral-600">{formData.date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-medium text-neutral-900 w-20">Time:</span>
                      <span className="text-neutral-600">{formData.timeSlot}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="font-medium text-neutral-900 w-20">Name:</span>
                      <span className="text-neutral-600">{formData.name}</span>
                    </div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="px-8 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-full font-medium transition-colors"
                  >
                    Book Another Appointment
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                  className="w-full h-full flex flex-col"
                >
                  {/* Step 1: Select Service */}
                  {step === 1 && (
                    <div className="flex-1 flex flex-col">
                      <div className="mb-6">
                        <h3 className="text-2xl font-display text-sage mb-2">Select a Service</h3>
                        <p className="text-neutral-600 text-sm">Choose the type of appointment you need.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                        {SERVICES.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => updateFormData('serviceId', service.id)}
                            className={`
                              relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 text-center
                              ${formData.serviceId === service.id 
                                ? 'border-terracotta bg-terracotta/5 shadow-md' 
                                : 'border-neutral-200 hover:border-terracotta/40 hover:bg-neutral-50'
                              }
                            `}
                          >
                            <service.icon className={`w-7 h-7 sm:w-8 sm:h-8 mb-3 ${formData.serviceId === service.id ? 'text-terracotta' : 'text-sage'}`} />
                            <span className={`font-medium text-sm ${formData.serviceId === service.id ? 'text-sage' : 'text-neutral-700'}`}>
                              {service.name}
                            </span>
                            {formData.serviceId === service.id && (
                              <div className="absolute top-3 right-3 text-terracotta">
                                <CheckCircle2 className="w-5 h-5 fill-terracotta/20" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="mt-auto flex justify-end pt-6 border-t border-neutral-100">
                        <button
                          onClick={nextStep}
                          disabled={!formData.serviceId}
                          className={`
                            px-8 py-3.5 rounded-full font-semibold transition-all duration-300 text-sm
                            ${formData.serviceId 
                              ? 'bg-terracotta hover:bg-terracotta-hover text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5' 
                              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                            }
                          `}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Date & Time */}
                  {step === 2 && (
                    <div className="flex-1 flex flex-col h-full">
                      <div className="mb-6">
                        <h3 className="text-2xl font-display text-sage mb-2">Select Date & Time</h3>
                        <p className="text-neutral-600 text-sm">Find a slot that works for you.</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 flex-1">
                        {/* Calendar Column */}
                        <div className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-neutral-100 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-6">
                            <h4 className="font-semibold text-neutral-900 flex items-center gap-2">
                              <CalendarIcon className="w-5 h-5 text-sage" />
                              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </h4>
                            <div className="flex gap-2">
                              <button onClick={handlePrevMonth} className="p-2 hover:bg-neutral-200 rounded-full transition-colors text-neutral-700">
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button onClick={handleNextMonth} className="p-2 hover:bg-neutral-200 rounded-full transition-colors text-neutral-700">
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                              <div key={day} className="text-xs font-semibold text-neutral-500 py-2">{day}</div>
                            ))}
                          </div>

                          {isCalendarLoading ? (
                            <div className="grid grid-cols-7 gap-2 animate-pulse">
                              {Array.from({ length: 35 }).map((_, i) => (
                                <div key={`skel-${i}`} className="h-10 bg-neutral-200 rounded-full"></div>
                              ))}
                            </div>
                          ) : (
                            <div className="grid grid-cols-7 gap-1 flex-1">
                              {renderCalendar()}
                            </div>
                          )}
                        </div>

                        {/* Time Slots Column */}
                        <div className="flex flex-col h-full max-h-[300px] sm:max-h-[350px]">
                          <h4 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-sage" />
                            Available Times
                          </h4>
                          
                          <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-6 flex-1 overflow-y-auto custom-scrollbar">
                            {!formData.date ? (
                              <div className="h-full flex items-center justify-center text-neutral-500 text-sm italic">
                                Please select a date first
                              </div>
                            ) : isCalendarLoading ? (
                               <div className="grid grid-cols-3 gap-3 animate-pulse">
                                  {Array.from({ length: 12 }).map((_, i) => (
                                    <div key={`skel-time-${i}`} className="h-12 bg-neutral-200 rounded-xl"></div>
                                  ))}
                               </div>
                            ) : (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                {TIME_SLOTS.map(time => (
                                  <button
                                    key={time}
                                    onClick={() => updateFormData('timeSlot', time)}
                                    className={`
                                      py-2.5 px-2 rounded-xl text-sm font-medium transition-all duration-200 border
                                      ${formData.timeSlot === time 
                                        ? 'bg-terracotta border-terracotta text-white shadow-md' 
                                        : 'bg-white border-neutral-200 text-neutral-700 hover:border-terracotta/50 hover:text-terracotta'
                                      }
                                    `}
                                  >
                                    {time}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between pt-6 border-t border-neutral-100">
                        <button
                          onClick={prevStep}
                          className="px-6 py-3 rounded-full font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={nextStep}
                          disabled={!formData.date || !formData.timeSlot}
                          className={`
                            px-8 py-3 rounded-full font-medium transition-all duration-300
                            ${(formData.date && formData.timeSlot)
                              ? 'bg-terracotta hover:bg-terracotta-hover text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5' 
                              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                            }
                          `}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Your Information */}
                  {step === 3 && (
                    <div className="flex-1 flex flex-col">
                       <div className="mb-6">
                        <h3 className="text-2xl font-display text-sage mb-2">Your Information</h3>
                        <p className="text-neutral-600 text-sm">Please provide your details so we can reach you.</p>
                      </div>

                      <div className="space-y-5 flex-1 max-w-lg mx-auto w-full pt-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5 ml-1">Full Name</label>
                          <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateFormData('name', e.target.value)}
                            className={`
                              w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all
                              ${formErrors.name 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                : 'border-neutral-300 focus:border-sage focus:ring-sage/20'
                              }
                            `}
                            placeholder="John Doe"
                          />
                          {formErrors.name && <p className="mt-1.5 text-sm text-red-500 ml-1">{formErrors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5 ml-1">Email Address</label>
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            className={`
                              w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all
                              ${formErrors.email 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                : 'border-neutral-300 focus:border-sage focus:ring-sage/20'
                              }
                            `}
                            placeholder="john@example.com"
                          />
                          {formErrors.email && <p className="mt-1.5 text-sm text-red-500 ml-1">{formErrors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5 ml-1">Phone Number</label>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            className={`
                              w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all
                              ${formErrors.phone 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                : 'border-neutral-300 focus:border-sage focus:ring-sage/20'
                              }
                            `}
                            placeholder="+1 (555) 000-0000"
                          />
                          {formErrors.phone && <p className="mt-1.5 text-sm text-red-500 ml-1">{formErrors.phone}</p>}
                        </div>

                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1.5 ml-1">Additional Notes (Optional)</label>
                          <textarea
                            id="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={(e) => updateFormData('notes', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all resize-none"
                            placeholder="Any specific concerns or questions..."
                          ></textarea>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between pt-6 border-t border-neutral-100">
                        <button
                          onClick={prevStep}
                          className="px-6 py-3 rounded-full font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={nextStep}
                          className="px-8 py-3.5 bg-terracotta hover:bg-terracotta-hover text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm"
                        >
                          Confirm Booking
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Required for the custom scrollbar in the time slots */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E0D8;
          border-radius: 20px;
        }
      `}} />
    </section>
  );
}
