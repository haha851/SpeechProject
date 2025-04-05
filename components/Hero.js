import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 59,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) {
          return { ...prev, seconds: newSeconds };
        }
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) {
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) {
          return { hours: newHours, minutes: 59, seconds: 59 };
        }
        
        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => value.toString().padStart(2, '0');

  return (
    <div className="relative bg-[var(--bg-light)]">
      {/* Countdown Timer */}
      <div className="sticky top-0 z-40 w-full bg-[var(--accent)] text-white text-center py-2 text-sm font-medium">
        ⏳ Launch offer ends in: {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-12 pb-20 md:pt-24 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-[var(--primary-dark)]/10 text-[var(--primary)] rounded-full text-sm font-medium mb-4">
              #1 AI Speech Writing Service
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
              Need a Powerful, Personalized Speech — <span className="text-[var(--primary)]">Fast?</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              Expertly crafted by our AI system, tailored to your unique story and voice. 25% off for launch day — limited time offer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.a 
                href="#order-form" 
                className="btn-primary text-center sm:text-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                🚀 Start My Speech
              </motion.a>
              <motion.a 
                href="#product-features" 
                className="btn-secondary text-center sm:text-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                How It Works
              </motion.a>
            </div>
            
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-medium">J</div>
                <div className="w-8 h-8 rounded-full bg-[var(--secondary)] text-white flex items-center justify-center text-sm font-medium">A</div>
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-sm font-medium">S</div>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                <span className="font-medium">100+ clients</span> delivered unforgettable speeches
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl opacity-20 blur-lg"></div>
            <motion.div 
              className="relative card max-w-md mx-auto bg-white border border-gray-100 shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="absolute -top-3 right-4 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                25% OFF TODAY
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-4xl mr-3">💬</span>
                  <div>
                    <h3 className="font-bold text-lg">Wedding Toast Example</h3>
                    <p className="text-[var(--text-secondary)] text-sm">3-minute, heartfelt with humor</p>
                  </div>
                </div>
                <blockquote className="italic text-[var(--text-secondary)] border-l-4 border-[var(--primary)]/20 pl-4 py-2 text-sm">
                  "I've known Sarah since college, and from dorm room adventures to standing here today, one thing has always been clear—she has the biggest heart of anyone I know. Even when she 'borrowed' my clothes without asking..."
                </blockquote>
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm text-[var(--text-secondary)]">5.0</span>
                  </div>
                  <a 
                    href="#order-form" 
                    className="text-[var(--primary)] font-medium text-sm hover:underline"
                  >
                    Get yours →
                  </a>
                </div>
              </div>
            </motion.div>
            
            <div className="hidden md:block absolute -bottom-10 -right-10 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">24-48 hour delivery</p>
                  <p className="text-xs text-[var(--text-secondary)]">Satisfaction guaranteed</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}