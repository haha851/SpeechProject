"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SmoothTransition({ children }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [nextSection, setNextSection] = useState('');
  const [direction, setDirection] = useState(1); // 1 for down, -1 for up
  const lastScrollY = useRef(0);
  const targetRef = useRef(null);
  
  // Track scroll position and direction
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newDirection = scrollY > lastScrollY.current ? 1 : -1;
      
      // Update direction only if it has changed and we've scrolled a bit
      if (newDirection !== direction && Math.abs(scrollY - lastScrollY.current) > 50) {
        setDirection(newDirection);
      }
      
      lastScrollY.current = scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [direction]);
  
  // Detect section changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id) {
            if (currentSection !== entry.target.id) {
              setNextSection(entry.target.id);
              
              // Only animate transitions when scrolling a substantial amount
              if (Math.abs(lastScrollY.current - window.scrollY) > 100) {
                startTransition(entry.target.id);
              } else {
                // Directly update without animation for small scroll changes
                setCurrentSection(entry.target.id);
              }
            }
          }
        });
      },
      { threshold: 0.4 } // Trigger when 40% of section is visible
    );
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, [currentSection]);
  
  // Handle transition between sections
  const startTransition = (newSection) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    setNextSection(newSection);
    
    // Short timeout to allow transition to begin
    setTimeout(() => {
      setCurrentSection(newSection);
      
      // End transition with a slight delay
      setTimeout(() => {
        setIsNavigating(false);
      }, 600);
    }, 300);
  };
  
  // Handle link clicks to smooth scroll with transition
  useEffect(() => {
    const handleLinkClick = (e) => {
      // Only intercept hash links
      const link = e.target.closest('a');
      if (!link || !link.hash) return;
      
      const targetId = link.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Get position of target
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        
        // Set direction based on where we're navigating
        setDirection(distance > 0 ? 1 : -1);
        
        // Start transition
        setNextSection(targetId);
        setIsNavigating(true);
        
        // Scroll to the target section with smooth behavior
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // After scrolling is complete, update current section
        setTimeout(() => {
          setCurrentSection(targetId);
          setIsNavigating(false);
        }, 1000);
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);
  
  return (
    <>
      {/* Transition overlay */}
      <AnimatePresence mode="wait">
        {isNavigating && (
          <motion.div
            key="transition-overlay"
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-white text-xl font-light">
                {direction > 0 ? 'Scrolling down...' : 'Scrolling up...'}
              </div>
            </motion.div>
            
            <motion.div
              className={`absolute inset-0 bg-gradient-to-b from-transparent ${
                direction > 0 
                  ? 'to-black/80 translate-y-full' 
                  : 'from-black/80 -translate-y-full'
              }`}
              animate={{ 
                translateY: 0 
              }}
              transition={{ 
                duration: 0.5,
                ease: [0.22, 0.61, 0.36, 1]
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content with section transitions */}
      <div ref={targetRef} className="relative">
        {children}
      </div>
      
      {/* Fixed background colors for different sections */}
      <style jsx global>{`
        /* Custom background colors for different sections */
        #hero {
          --section-bg-from: rgba(46, 16, 101, 1);
          --section-bg-to: rgba(98, 30, 156, 1);
        }
        
        #features {
          --section-bg-from: rgba(37, 99, 235, 1);
          --section-bg-to: rgba(79, 70, 229, 1);
        }
        
        #process {
          --section-bg-from: rgba(5, 150, 105, 1);
          --section-bg-to: rgba(16, 185, 129, 1);
        }
        
        #pricing {
          --section-bg-from: rgba(234, 88, 12, 1);
          --section-bg-to: rgba(249, 115, 22, 1);
        }
        
        #testimonials {
          --section-bg-from: rgba(124, 58, 237, 1);
          --section-bg-to: rgba(139, 92, 246, 1);
        }
        
        #faq {
          --section-bg-from: rgba(59, 130, 246, 1);
          --section-bg-to: rgba(37, 99, 235, 1);
        }
        
        #cta {
          --section-bg-from: rgba(76, 29, 149, 1);
          --section-bg-to: rgba(124, 58, 237, 1);
        }
        
        /* Smooth transition between sections */
        section {
          transition: background 0.5s ease-in-out;
        }
        
        body {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}