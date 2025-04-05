"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Header({ isAudioPlaying, toggleAudio, visualizerRef }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Calculate scroll progress for the progress bar
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(100, (window.scrollY / totalHeight) * 100);
      setScrollProgress(progress);
      
      // Determine active section for nav highlighting
      const sections = ['hero', 'features', 'process', 'pricing', 'faq'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && 
            scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'backdrop-blur-md bg-black/20 shadow-lg shadow-purple-900/10' : ''
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1]
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo">
          <a href="#" className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="overflow-hidden relative"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Logo highlight effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0.1, 0.15, 0.1],
                  scale: 1,
                }}
                transition={{
                  opacity: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  },
                  scale: { duration: 0.5 }
                }}
                style={{
                  transformOrigin: "center"
                }}
              />
              {/* Logo: The Speech Writer by Arthur Iverson */}
              <div className="flex items-center">
                <svg 
                  className="w-10 h-auto mr-3"
                  viewBox="0 0 60 60" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Fountain Pen with pulse effect */}
                  <motion.circle
                    cx="30" cy="30" r="22"
                    fill="white" fillOpacity="0.1"
                    stroke="white"
                    strokeWidth="2"
                    animate={{
                      r: [22, 23, 22],
                      fillOpacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Fountain Pen */}
                  <motion.path
                    d="M40 15L25 30l-5 15l15-5l15-15L40 15z"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    animate={{
                      strokeDashoffset: [0, 50, 0],
                    }}
                    style={{
                      strokeDasharray: 100,
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Pen nib */}
                  <path d="M25 30l-2 6l6-2l-4-4z" stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.3"/>
                  {/* Cap/detail */}
                  <path d="M42 13l5 5l-4 4l-5-5l4-4z" stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.2"/>
                </svg>
                <div>
                  <motion.div
                    className="text-lg font-bold leading-tight tracking-wider gradient-text-animated gradient-text-purple"
                    animate={{
                      textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 3px rgba(255,255,255,0.3)', '0 0 0px rgba(255,255,255,0)']
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    THE SPEECH WRITER
                  </motion.div>
                  <div className="text-xs opacity-80">BY ARTHUR IVERSON</div>
                </div>
              </div>
            </motion.div>
          </a>
        </div>
        
        {/* Navigation for larger screens */}
        <nav className="hidden md:flex items-center space-x-10">
          <NavLink href="#features" isActive={activeSection === 'features'}>
            Services
          </NavLink>
          <NavLink href="#process" isActive={activeSection === 'process'}>
            Process
          </NavLink>
          <NavLink href="#pricing" isActive={activeSection === 'pricing'}>
            Pricing
          </NavLink>
          <NavLink href="#faq" isActive={activeSection === 'faq'}>
            FAQ
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          {/* Audio visualizer and toggle with enhanced animations */}
          <motion.button
            onClick={toggleAudio}
            className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-all group"
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute inset-0 transition-all duration-300 ${isAudioPlaying ? 'opacity-0' : 'opacity-100'}`}
                animate={isAudioPlaying ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.path
                  d="M4.5 12h3l4.5-4v8l-4.5-4h-3V12z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  animate={{ strokeDashoffset: [0, 10, 0] }}
                  style={{ strokeDasharray: 40 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M16 8.5c1 1 1.5 2 1.5 3.5s-.5 2.5-1.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  animate={{ strokeDashoffset: [0, 15, 0] }}
                  style={{ strokeDasharray: 30 }}
                  transition={{ duration: 3, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M18 7c1.5 1.5 2.5 3.2 2.5 5s-1 3.5-2.5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                  animate={{ strokeDashoffset: [0, 20, 0] }}
                  style={{ strokeDasharray: 40 }}
                  transition={{ duration: 3, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.svg>
              
              <div
                ref={visualizerRef}
                className={`visualizer-container w-10 h-6 items-end justify-center transition-all duration-300 ${isAudioPlaying ? 'opacity-100 flex' : 'opacity-0 hidden'}`}
              >
                {/* Audio bars will be dynamically added by the audio analyzer */}
                <div className="visualizer-bar h-3"></div>
                <div className="visualizer-bar h-4"></div>
                <div className="visualizer-bar h-6"></div>
                <div className="visualizer-bar h-5"></div>
                <div className="visualizer-bar h-2"></div>
                <div className="visualizer-bar h-4"></div>
              </div>
            </div>
            <motion.span
              animate={isAudioPlaying ?
                { color: ["#ffffff", "#a78bfa", "#ffffff"] } :
                { color: "#ffffff" }
              }
              transition={{
                duration: 3,
                repeat: isAudioPlaying ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {isAudioPlaying ? "Playing" : "Sound"}
            </motion.span>
          </motion.button>
          
          {/* Theme Toggle */}
          <ThemeToggle className="hidden md:flex" />
          
          {/* Mobile nav button (shown on small screens) */}
          {/* Enhanced mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={isScrolled ? { strokeOpacity: 1 } : { strokeOpacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  strokeDashoffset: [0, 30, 0],
                  pathLength: [1, 0.8, 1]
                }}
                style={{ strokeDasharray: 30 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.button>
          
          {/* CTA Button */}
          {/* Enhanced CTA Button */}
          <motion.a
            href="#cta"
            className="btn text-sm relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <motion.span
              className="relative z-10"
              animate={{ y: [0, 0] }} // Dummy animation to enable motion animations
            >
              Start My Speech
            </motion.span>
            
            {/* Button highlight effect */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.a>
        </div>
      </div>
      
      {/* Progress indicator */}
      {/* Enhanced progress indicator with gradient and subtle animation */}
      <motion.div
        className="h-[2px] absolute bottom-0 left-0 overflow-hidden"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, rgba(139, 92, 246, 0.5), rgba(255, 255, 255, 0.8))",
          boxShadow: "0 0 8px rgba(139, 92, 246, 0.5)",
        }}
        animate={{
          boxShadow: ['0 0 5px rgba(139, 92, 246, 0.3)', '0 0 8px rgba(139, 92, 246, 0.6)', '0 0 5px rgba(139, 92, 246, 0.3)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.header>
  );
}

// Enhanced Navigation Link Component
function NavLink({ href, isActive, children }) {
  return (
    <motion.a
      href={href}
      className={`text-sm font-medium relative ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/70 rounded-full"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        exit={{ scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Hover indicator */}
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white/50 rounded-full"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: "center" }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
}