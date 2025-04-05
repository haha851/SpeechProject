"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RavenMascot from './RavenMascot';
import { InkDrop, InkWriteText, InkLine, InkReveal } from './InkInteraction';
import { RevealOnScroll, StaggerOnScroll, ParallaxOnScroll } from './ScrollAnimation';

export default function LuxuryShowcase() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const quoteRef = useRef(null);
  const processRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Set section as visible after initial load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Configure scroll-triggered animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate the quote when scrolled into view
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { 
          opacity: 0,
          y: 50
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Animate process cards when scrolled into view
    if (processRef.current) {
      const cards = processRef.current.querySelectorAll('.process-card');
      
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50
          },
          { 
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
    
    // Create ink drip animation on scroll
    const inkDrips = document.querySelectorAll('.ink-drip');
    inkDrips.forEach((drip) => {
      gsap.fromTo(
        drip,
        { height: 0 },
        {
          height: "80px",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: drip,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    // Parallax effect on decorative elements
    const decorElements = document.querySelectorAll('.decor-element');
    decorElements.forEach((elem, i) => {
      gsap.to(elem, {
        y: (i % 2 === 0) ? 50 : -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, [isVisible]);
  
  // Setup scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const ravenRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "10deg"]);
  const featherOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0.5]);
  
  return (
    <section
      ref={sectionRef} 
      id="luxury-showcase"
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-slate-900"
    >
      {/* Background elements - floating feathers */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: featherOpacity }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="decor-element absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.1 + (Math.random() * 0.2)
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: Math.random() * 180 }}
            animate={{ 
              opacity: 0.1 + (Math.random() * 0.2), 
              scale: 0.8 + (Math.random() * 0.4),
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0],
              rotate: Math.random() * 360
            }}
            transition={{
              duration: 10 + (Math.random() * 20),
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-8 h-8 md:w-12 md:h-12"
            >
              <path 
                d="M20,1 C20,1 19,4 16,8 C13,12 6,16 3,23 C3,23 10,19 15,15 C20,11 22,4 20,1 Z" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                fill="rgba(0,0,0,0.05)"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Raven mascot floating in top-right corner */}
      <RavenMascot position="top-right" size="medium" />
      
      {/* Main container */}
      <div 
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
      >
        {/* Header with ink effect */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 ink-drip bg-black opacity-80 rounded-b-full" />
          
          <RevealOnScroll direction="up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 relative inline-block">
              Crafting Your Legacy
              
              {/* Underline ink splash effect */}
              <InkDrop 
                position="bottom-center" 
                size="small" 
                intensity="medium" 
                color="black"
              >
                <div className="w-full h-2 bg-transparent" />
              </InkDrop>
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              Where the written word transcends ordinary communication to become an artistic expression of your vision.
            </p>
          </RevealOnScroll>
        </div>
        
        {/* Quote section with ink reveal effect */}
        <div 
          ref={quoteRef}
          className="my-24 relative"
        >
          <InkDrop
            position="center"
            size="large"
            intensity="light"
            color="black"
            scrollTrigger={true}
          >
            <blockquote className="text-center px-8 py-10">
              <div className="mb-6">
                <InkLine direction="horizontal" length="small" thickness="thin" color="black" />
              </div>
              
              <InkWriteText
                text="Every great speech begins with a single drop of inspiration."
                speed="medium"
                color="black"
                className="text-2xl md:text-3xl lg:text-4xl font-serif italic block mb-8"
              />
              
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
                — The Speechwriter
              </div>
              
              <div className="mt-6">
                <InkLine direction="horizontal" length="small" thickness="thin" color="black" />
              </div>
            </blockquote>
          </InkDrop>
        </div>
        
        {/* Process cards with ink reveals */}
        <div 
          ref={processRef}
          className="my-32 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Card 1 */}
          <div className="process-card">
            <InkReveal direction="left-to-right" delay={0.1} color="black">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
                <div className="mb-6 relative h-16">
                  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 absolute">
                    <path d="M20,4 C20,2.9 19.1,2 18,2 L6,2 C4.9,2 4,2.9 4,4 L4,20 C4,21.1 4.9,22 6,22 L18,22 C19.1,22 20,21.1 20,20 L20,4 Z M6,4 L18,4 L18,8 L6,8 L6,4 Z M6,12 L10,12 L10,16 L6,16 L6,12 Z M18,20 L6,20 L6,18 L18,18 L18,20 Z M18,16 L12,16 L12,12 L18,12 L18,16 Z" fill="currentColor" className="text-gray-900 dark:text-gray-100" />
                  </svg>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full opacity-30"></div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-4">
                  Conceptualization
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300">
                  We begin by understanding your vision, audience, and objectives. Our meticulous research ensures every word resonates with authenticity.
                </p>
              </div>
            </InkReveal>
          </div>
          
          {/* Card 2 */}
          <div className="process-card">
            <InkReveal direction="right-to-left" delay={0.2} color="black">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
                <div className="mb-6 relative h-16">
                  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 absolute">
                    <path d="M13,12 L21,12 L21,4 L13,4 L13,12 Z M3,20 L11,20 L11,12 L3,12 L3,20 Z M3,10 L11,10 L11,2 L3,2 L3,10 Z M15,14 L19,14 L19,18 L15,18 L15,14 Z M13,22 L21,22 L21,14 L13,14 L13,22 Z" fill="currentColor" className="text-gray-900 dark:text-gray-100" />
                  </svg>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full opacity-30"></div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-4">
                  Structural Crafting
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300">
                  We architect a compelling narrative structure, balancing emotion with logic, creating a foundation that supports your message with elegance.
                </p>
              </div>
            </InkReveal>
          </div>
          
          {/* Card 3 */}
          <div className="process-card">
            <InkReveal direction="bottom-to-top" delay={0.3} color="black">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
                <div className="mb-6 relative h-16">
                  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 absolute">
                    <path d="M3,17.25 L3,21 L6.75,21 L17.81,9.94 L14.06,6.19 L3,17.25 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 Z" fill="currentColor" className="text-gray-900 dark:text-gray-100" />
                  </svg>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full opacity-30"></div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-4">
                  Linguistic Refinement
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300">
                  Our writers employ precise language, rhetorical devices, and rhythmic patterns to elevate your message into a memorable experience.
                </p>
              </div>
            </InkReveal>
          </div>
          
          {/* Card 4 */}
          <div className="process-card">
            <InkReveal direction="top-to-bottom" delay={0.4} color="black">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
                <div className="mb-6 relative h-16">
                  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 absolute">
                    <path d="M12,3 C10.9,3 10,3.9 10,5 C10,6.1 10.9,7 12,7 C13.1,7 14,6.1 14,5 C14,3.9 13.1,3 12,3 Z M19,3 L15,3 L15,5 L19,5 L19,12 L15.08,12 C14.45,9.9 12.5,8.5 10.5,8.5 L9,8.5 L9,18 L10.5,18 L10.5,21 L13.5,21 L13.5,18 L15,18 L15,21 L18,21 L18,12.9 L21,12.9 L21,5 L21,3 L19,3 Z M5,10 C3.9,10 3,10.9 3,12 C3,13.1 3.9,14 5,14 C6.1,14 7,13.1 7,12 C7,10.9 6.1,10 5,10 Z" fill="currentColor" className="text-gray-900 dark:text-gray-100" />
                  </svg>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full opacity-30"></div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-4">
                  Delivery Preparation
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300">
                  Beyond writing, we provide guidance on vocal inflection, pacing, and physical presence to ensure your delivery matches the power of your words.
                </p>
              </div>
            </InkReveal>
          </div>
        </div>
        
        {/* Final CTA with ink drop effect */}
        <div className="mt-24 mb-12 text-center relative">
          <InkDrop
            position="center"
            size="medium"
            intensity="light"
            color="black"
            scrollTrigger={true}
          >
            <div className="py-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                Transform Your Thoughts Into Legacy
              </h3>
              
              <motion.button
                className="px-8 py-4 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Begin Your Journey
              </motion.button>
            </div>
          </InkDrop>
        </div>
      </div>
    </section>
  );
}