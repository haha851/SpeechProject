"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    // Set end date to 5 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 5);
    
    const interval = setInterval(() => {
      const now = new Date();
      const distance = endDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
      
      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} id="cta" className="py-28 relative overflow-hidden">
      {/* Enhanced background elements with sophisticated gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/0 via-purple-800/40 to-indigo-900/0" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-breathe" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-breathe"
           style={{ animationDelay: '2s' }} />
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-indigo-900 to-transparent" />
      
      {/* Added subtle noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto glass rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-layered micro-border"
          style={{
            background: "linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(124, 58, 237, 0.25) 50%, rgba(139, 92, 246, 0.15) 100%)",
            boxShadow: `
              0 4px 8px rgba(0,0,0,0.03),
              0 8px 16px rgba(0,0,0,0.04),
              0 16px 32px rgba(0,0,0,0.05),
              inset 0 1px 1px rgba(255,255,255,0.1)
            `
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          whileHover={{
            boxShadow: `
              0 8px 16px rgba(0,0,0,0.04),
              0 16px 32px rgba(0,0,0,0.05),
              0 24px 48px rgba(0,0,0,0.06),
              inset 0 1px 1px rgba(255,255,255,0.12)
            `
          }}
        >
          {/* Enhanced floating particles with variety */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(25)].map((_, i) => {
              // Create more variety in particles
              const isSmall = i % 3 === 0;
              const isMedium = i % 3 === 1;
              const isRing = i % 5 === 0;
              const size = isSmall ? 1.5 : isMedium ? 2.5 : 3.5;
              const blur = isSmall ? 0.5 : isMedium ? 1 : 1.5;
              
              return (
                <motion.div
                  key={i}
                  className={`absolute ${isRing ? 'rounded-full border border-white/40 bg-transparent' : 'rounded-full bg-white/30'}`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    filter: `blur(${blur}px)`,
                    boxShadow: isRing ? '0 0 4px rgba(255,255,255,0.3)' : 'none'
                  }}
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: Math.random() * 0.5 + 0.3,
                    scale: 1
                  }}
                  animate={{
                    x: [
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%"
                    ],
                    y: [
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%"
                    ],
                    opacity: [
                      Math.random() * 0.5 + 0.3,
                      Math.random() * 0.7 + 0.3,
                      Math.random() * 0.5 + 0.3
                    ],
                    scale: isRing ? [1, 1.3, 1] : 1
                  }}
                  transition={{
                    duration: 15 + Math.random() * 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </div>
          
          {/* Animated light effect */}
          <motion.div
            className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-8 text-center gradient-text-animated gradient-text-purple"
              style={{
                letterSpacing: "0.01em",
                lineHeight: "1.2"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Get 25% Off — Just 5 Spots Today
            </motion.h2>
            
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="grid grid-cols-4 gap-4 md:gap-6">
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hours" },
                  { value: countdown.minutes, label: "Minutes" },
                  { value: countdown.seconds, label: "Seconds" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 + (index * 0.1) }}
                  >
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 glass rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold mb-2 micro-border shadow-layered"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        borderColor: "rgba(255, 255, 255, 0.1)"
                      }}
                      whileHover={{
                        y: -2,
                        scale: 1.03,
                        background: "rgba(255, 255, 255, 0.06)",
                        transition: { duration: 0.2 }
                      }}
                      animate={
                        index === 3 ? { // Only animate seconds
                          scale: [1, item.value % 2 === 0 ? 1.05 : 1, 1],
                          borderColor: [
                            "rgba(255, 255, 255, 0.1)",
                            "rgba(165, 180, 252, 0.3)",
                            "rgba(255, 255, 255, 0.1)"
                          ]
                        } : {}
                      }
                      transition={{
                        scale: { duration: 0.5, ease: "easeInOut" },
                        borderColor: { duration: 1, ease: "easeInOut" }
                      }}
                    >
                      {item.value < 10 ? `0${item.value}` : item.value}
                    </motion.div>
                    <span className="text-xs md:text-sm text-indigo-100/80 font-medium tracking-wide">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <p className="mb-8 text-lg text-indigo-100/90 max-w-2xl mx-auto"
                 style={{ letterSpacing: "0.01em", lineHeight: "1.6" }}>
                Don't miss this limited-time offer. Lock in your discount today and get ready to deliver a speech that will be remembered for years to come.
              </p>
              
              <motion.div className="relative inline-block">
                {/* Button glow effect */}
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-indigo-500/20 via-purple-500/30 to-pink-500/20 rounded-full blur-xl"
                  animate={{
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.5, 0.7, 0.5],
                    filter: ["blur(15px)", "blur(20px)", "blur(15px)"]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }}
                />
                
                <motion.button
                  className="relative btn px-10 py-4 text-lg shadow-layered glass micro-border z-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%)"
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 30px -5px rgba(124, 58, 237, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                  }}
                  onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    el.style.transform = `translate3d(0, 0, 0) rotateX(${y * 0.03}deg) rotateY(${-x * 0.03}deg) scale(1.05)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0) scale(1)';
                  }}
                >
                  <motion.span
                    className="inline-block mr-2"
                    animate={{ rotate: [0, 15, 0, -15, 0] }}
                    transition={{ duration: 1.5, delay: 2, repeat: 2, repeatDelay: 7 }}
                  >
                    ✨
                  </motion.span>
                  Start My Speech Now
                  
                  {/* Button animated border effect */}
                  <motion.span
                    className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"
                    animate={{
                      boxShadow: [
                        'inset 0 0 10px rgba(255,255,255,0.1), 0 0 0px rgba(139, 92, 246, 0.3)',
                        'inset 0 0 20px rgba(255,255,255,0.2), 0 0 10px rgba(139, 92, 246, 0.5)',
                        'inset 0 0 10px rgba(255,255,255,0.1), 0 0 0px rgba(139, 92, 246, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.button>
              </motion.div>
              
              {/* Added trust badges */}
              <motion.div
                className="flex justify-center items-center space-x-6 mt-8 opacity-70"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.7 } : {}}
                transition={{ duration: 0.7, delay: 1 }}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs text-indigo-100">Secure Payment</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-indigo-100">24-Hour Delivery</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L3 15" />
                  </svg>
                  <span className="text-xs text-indigo-100">100% Satisfaction</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}