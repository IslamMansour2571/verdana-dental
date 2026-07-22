'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Is the first consultation free?',
    answer: 'Yes, we offer a complimentary initial consultation including a digital scan and treatment plan discussion. This allows us to understand your needs and propose the best approach.'
  },
  {
    question: 'Do you accept dental insurance?',
    answer: 'We accept most major dental insurance plans. Our billing team will verify your coverage before treatment and help maximize your benefits.'
  },
  {
    question: 'How long do dental implants last?',
    answer: 'With proper care, dental implants can last a lifetime. They are made from biocompatible titanium that integrates with your jawbone, creating a permanent foundation.'
  },
  {
    question: 'Is teeth whitening safe?',
    answer: 'Professional teeth whitening is completely safe when performed by qualified dentists. We use ADA-approved products and customize the treatment intensity to your needs.'
  },
  {
    question: 'What should I expect during a root canal?',
    answer: 'Modern root canals are virtually painless. We use local anesthesia and microscopic technology for precision. Most patients report feeling comfortable throughout the procedure.'
  },
  {
    question: 'How often should I visit the dentist?',
    answer: 'We recommend a checkup and cleaning every six months. However, some patients may benefit from more frequent visits based on their oral health needs.'
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes, we offer flexible financing options including interest-free payment plans for treatments over $500. We work with CareCredit and in-house financing.'
  },
  {
    question: 'What age should children first visit the dentist?',
    answer: 'The American Dental Association recommends a child\'s first dental visit by their first birthday. Early visits help establish good oral health habits.'
  }
];

export default function FAQ() {
  return (
    <section className="bg-cream py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes slideDown {
          from { height: 0 }
          to { height: var(--radix-accordion-content-height) }
        }
        @keyframes slideUp {
          from { height: var(--radix-accordion-content-height) }
          to { height: 0 }
        }
        .accordion-content[data-state="open"] {
          animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }
        .accordion-content[data-state="closed"] {
          animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-6 justify-center">
          <div className="h-px bg-sage w-12"></div>
          <span className="text-sm font-semibold tracking-widest text-sage uppercase">Questions</span>
          <div className="h-px bg-sage w-12"></div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-sage mb-3 sm:mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-neutral-600 text-center mb-8 sm:mb-12 font-body text-sm sm:text-base">
          Everything you need to know about our practice and your dental care.
        </p>

        <Accordion.Root
          type="single"
          collapsible
          className="w-full"
        >
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border-b border-neutral-300"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="group flex flex-1 items-center justify-between py-5 sm:py-6 text-base sm:text-lg font-semibold font-body text-neutral-900 transition-colors hover:text-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded [&[data-state=open]>svg]:rotate-180">
                  <span className="text-left">{faq.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-sage transition-transform duration-300" aria-hidden />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="accordion-content overflow-hidden font-body text-neutral-600 text-sm sm:text-base leading-relaxed">
                <div className="pb-5 pr-8">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </motion.div>
    </section>
  );
}
