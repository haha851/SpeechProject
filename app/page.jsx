"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import ProcessSection from "../components/ProcessSection";
import PricingSection from "../components/PricingSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FaqSection from "../components/FaqSection";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import DynamicBackground from "../components/DynamicBackground";
import { RevealOnScroll, StaggerOnScroll, ParallaxOnScroll } from "../components/ScrollAnimation";
import { ScrollIndicator, SocialProofNotification, ExitIntentPopup } from "../components/MicroInteractions";
import SmoothTransition from "../components/SmoothTransition";
import { useTheme } from "../components/ThemeContext";

// Import our new luxury components
import RavenMascot from "../components/RavenMascot";
import LuxuryShowcase from "../components/LuxuryShowcase";
import LuxuryTestimonials from "../components/LuxuryTestimonials";

export default function Home() {
  // Theme
  const { currentTheme, isDarkMode } = useTheme();
  
  // Audio state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const visualizerRef = useRef(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll state
  const [scrollY, setScrollY] = useState(0);
  
  // Refs for sections
  const mainRef = useRef(null);
  const sectionsRef = useRef({
    hero: useRef(null),
    features: useRef(null),
    process: useRef(null),
    luxuryShowcase: useRef(null),
    pricing: useRef(null),
    testimonials: useRef(null),
    luxuryTestimonials: useRef(null),
    faq: useRef(null),
    cta: useRef(null),
  });
  
  // Fountain Pen logo component
  const Logo = ({ size = 40, color = "#fff" }) => (
    <div className="rounded-full bg-white/10 backdrop-blur-sm p-2 flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.svg
        width={size * 0.8}
        height={size * 0.8}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <path d="M17 3L10 10l-2 8l8-2l7-7L17 3z" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M10 10l-1 3l3-1l-2-2z" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.3"/>
        <path d="M18 2l4 4l-2 2l-4-4l2-2z" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.2"/>
      </motion.svg>
    </div>
  );
  
  // Audio toggle
  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  // Set initial loading state
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Calculate parallax effect
  const calculateParallax = (factor) => {
    return scrollY * factor;
  };
  
  // Create section refs
  useEffect(() => {
    document.querySelectorAll('section[id]').forEach((section) => {
      const id = section.id;
      if (sectionsRef.current[id]) {
        sectionsRef.current[id].current = section;
      }
    });
  }, [isLoading]);
  
  // Mouse parallax effect
  useEffect(() => {
    if (isLoading) return;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      
      document.querySelectorAll('.mouse-parallax').forEach(element => {
        const speed = element.getAttribute('data-speed') || 1;
        const xOffset = x * speed * 20;
        const yOffset = y * speed * 20;
        
        element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoading]);
  
  // Enhanced scroll progress calculation
  const { scrollYProgress } = useScroll();
  const scrollProgressTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <DynamicBackground currentTheme={currentTheme}>
      {/* Raven Mascot - fixed position element */}
      {!isLoading && <RavenMascot position="top-right" size="medium" />}
      
      {/* Enhanced scroll indicator */}
      <ScrollIndicator />
      
      {/* Dynamic social proof notifications */}
      <SocialProofNotification />
      
      {/* Exit intent popup for conversion */}
      <ExitIntentPopup />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 to-purple-900"
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative mb-8"
            >
              {/* Logo animation */}
              <div className="flex items-center">
                <Logo size={60} color="#fff" />
                <motion.div
                  className="ml-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.3, duration: 0.8 }
                  }}
                >
                  <h1 className="text-3xl font-playfair text-white">
                    <span className="opacity-90">THE </span>
                    <span className="font-bold">SPEECH</span>
                    <br />
                    <span className="font-bold">WRITER</span>
                  </h1>
                  <motion.div
                    className="text-sm text-white/60 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { delay: 0.5, duration: 0.8 }
                    }}
                  >
                    BY ARTHUR IVERSON
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Loading bar */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: "200px",
                opacity: 1,
                transition: { delay: 0.2, duration: 0.5 }
              }}
              className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-8"
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                transition: { 
                  times: [0, 0.3, 0.7, 1],
                  duration: 3, 
                  repeat: Infinity,
                  repeatDelay: 0.5
                }
              }}
              className="text-white/70 text-lg"
            >
              Your speech is being crafted...
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
            ref={mainRef}
            className="relative"
          >
            <SmoothTransition>
              {/* Progress indicator for entire page */}
              <motion.div 
                className="fixed top-0 left-0 h-1 bg-white/30 z-50"
                style={{ 
                  width: scrollProgressTransform,
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0.8))'
                }}
              />
              
              <Header 
                isAudioPlaying={isAudioPlaying} 
                toggleAudio={toggleAudio} 
                visualizerRef={visualizerRef}
              />
              
              {/* Main content sections with enhanced animations */}
              <div ref={sectionsRef.current.hero}>
                <HeroSection scrollY={scrollY} />
              </div>
              
              <div ref={sectionsRef.current.features}>
                <FeaturesSection />
              </div>
              
              {/* New Luxury Showcase Section */}
              <div ref={sectionsRef.current.luxuryShowcase}>
                <LuxuryShowcase />
              </div>
              
              <div ref={sectionsRef.current.process}>
                <ProcessSection />
              </div>
              
              <div ref={sectionsRef.current.pricing}>
                <PricingSection />
              </div>
              
              {/* New Luxury Testimonials Section */}
              <div ref={sectionsRef.current.luxuryTestimonials}>
                <LuxuryTestimonials />
              </div>
              
              <div ref={sectionsRef.current.testimonials}>
                <TestimonialsSection />
              </div>
              
              <div ref={sectionsRef.current.faq}>
                <FaqSection />
              </div>
              
              <div ref={sectionsRef.current.cta}>
                <CallToAction />
              </div>
              
              <Footer />
            </SmoothTransition>
          </motion.div>
        )}
      </AnimatePresence>
    </DynamicBackground>
  );
}