"use client";
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function FaqSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "Can I request revisions?",
      answer: "Yes, all packages include at least one round of revisions. The ImpactTalk, Executive, and Custom packages include two or more revision rounds to ensure your speech is perfect."
    },
    {
      question: "How fast is delivery?",
      answer: "Standard delivery is 48 hours from the time I have all the information needed. Need it faster? Rush delivery (24 hours) is available for an additional $25."
    },
    {
      question: "Do I own the final speech?",
      answer: "Absolutely. Once delivered, the speech is 100% yours to use, modify, and deliver as you see fit. I retain no rights to the content."
    },
    {
      question: "What information do you need from me?",
      answer: "The more you can share, the better. For best results, I'll need details about the occasion, audience, your relationship to the subject (for toasts/tributes), key points you want to include, and your speaking style and comfort level."
    },
    {
      question: "How do revisions work?",
      answer: "After receiving your first draft, simply highlight any sections you'd like changed and provide specific feedback. I'll incorporate your suggestions and return a revised version within 24 hours."
    },
    {
      question: "How do payments work?",
      answer: "Payments are processed securely via Checkya, Stripe, PayPal, or Apple Pay. A 50% deposit is required to begin work, with the remaining 50% due upon delivery of the first draft."
    }
  ];
  
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faq" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Frequently Asked Questions</h2>
          <p className="text-lg text-indigo-100/80 max-w-2xl mx-auto">
            Everything you need to know about the speech writing process.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full text-left p-4 rounded-lg flex justify-between items-center transition-all ${
                  openIndex === index ? 'bg-indigo-700/40' : 'bg-indigo-800/20 hover:bg-indigo-800/30'
                }`}
              >
                <span className="font-medium">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  className="text-xl"
                >
                  +
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-indigo-800/10 rounded-b-lg text-indigo-100/80">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}