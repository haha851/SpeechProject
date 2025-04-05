"use client";
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DynamicBackground({ children, currentTheme = 'purple' }) {
  const [bgPosition, setBgPosition] = useState(0);
  const [mouseMoveEnabled, setMouseMoveEnabled] = useState(true);
  const [themeChanging, setThemeChanging] = useState(false);
  const [particleCount, setParticleCount] = useState(15);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);
  
  // Store color values for different themes
  const themes = {
    purple: {
      primary: 'from-indigo-900/90 to-purple-900/90',
      accent: 'rgba(139, 92, 246, 0.3)',
      particles: 'rgba(167, 139, 250, 0.5)',
      secondary: 'rgba(129, 74, 216, 0.2)',
      tertiary: 'rgba(100, 50, 180, 0.25)',
    },
    blue: {
      primary: 'from-blue-900/90 to-indigo-800/90',
      accent: 'rgba(59, 130, 246, 0.3)',
      particles: 'rgba(96, 165, 250, 0.5)',
      secondary: 'rgba(37, 99, 235, 0.2)',
      tertiary: 'rgba(29, 78, 216, 0.25)',
    },
    green: {
      primary: 'from-emerald-900/90 to-teal-800/90',
      accent: 'rgba(5, 150, 105, 0.3)',
      particles: 'rgba(52, 211, 153, 0.5)',
      secondary: 'rgba(4, 120, 87, 0.2)',
      tertiary: 'rgba(6, 95, 70, 0.25)',
    },
    orange: {
      primary: 'from-orange-900/90 to-amber-800/90',
      accent: 'rgba(249, 115, 22, 0.3)',
      particles: 'rgba(251, 146, 60, 0.5)',
      secondary: 'rgba(234, 88, 12, 0.2)',
      tertiary: 'rgba(194, 65, 12, 0.25)',
    },
  };
  
  // Handle scroll effect to move background and update parallax elements
  useEffect(() => {
    const handleScroll = () => {
      if (!backgroundRef.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll position percentage (0-100)
      const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
      setBgPosition(scrollPercentage * 0.5); // Move background slower than scroll
      
      // Temporarily disable mouse move effect while scrolling for performance
      if (mouseMoveEnabled) {
        setMouseMoveEnabled(false);
        setTimeout(() => setMouseMoveEnabled(true), 100);
      }
      
      // Adjust particle count based on scroll position for performance
      const newParticleCount = window.innerWidth < 768
        ? 8 + Math.floor(scrollPercentage / 20) // Fewer particles on mobile
        : 15 + Math.floor(scrollPercentage / 10); // More particles as user scrolls
        
      setParticleCount(Math.min(newParticleCount, 25)); // Cap at 25 particles
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mouseMoveEnabled]);
  
  // Handle mouse movement for subtle background effect
  useEffect(() => {
    if (!mouseMoveEnabled) return;
    
    const handleMouseMove = (e) => {
      if (!backgroundRef.current || !mouseMoveEnabled) return;
      
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      
      // Only update if mouse position changed significantly (optimization)
      if (
        Math.abs(x - mousePosition.x) > 1 ||
        Math.abs(y - mousePosition.y) > 1
      ) {
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition, mouseMoveEnabled]);
  
  // Create particles for background effect
  const [particles, setParticles] = useState([]);
  // Watch for theme changes to trigger transition effect
  useEffect(() => {
    setThemeChanging(true);
    const timer = setTimeout(() => setThemeChanging(false), 1000);
    return () => clearTimeout(timer);
  }, [currentTheme]);
  
  // Generate particles with different characteristics
  useEffect(() => {
    // Generate primary particles
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 300 + 100,
      posX: Math.random() * 100,
      posY: Math.random() * 100,
      blur: Math.random() * 100 + 50,
      delay: i * (Math.random() * 3),
      opacity: Math.random() * 0.4 + 0.1,
      speed: 0.8 + (Math.random() * 0.4), // Animation speed factor
      amplitude: 20 + (Math.random() * 20), // Movement amplitude
      type: i % 3, // Different particle types for visual variety
    }));
    
    setParticles(newParticles);
  }, [particleCount, currentTheme]);
  
  // Transformations based on mouse and scroll
  const parallaxFactor = 0.03;
  const mouseParallax = {
    x: (mousePosition.x - 50) * parallaxFactor,
    y: (mousePosition.y - 50) * parallaxFactor,
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed background that changes with theme */}
      <motion.div
        ref={backgroundRef}
        className={`fixed inset-0 bg-gradient-to-b ${themes[currentTheme]?.primary || themes.purple.primary}`}
        initial={false}
        animate={{ 
          opacity: 1,
        }}
        transition={{ duration: 0.8 }}
        style={{
          transform: `translate3d(${mouseParallax.x}px, ${-bgPosition + mouseParallax.y}px, 0)`,
        }}
      >
        {/* Enhanced dynamic background particles with different shapes and behaviors */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute ${particle.type === 1 ? 'rounded-3xl' : particle.type === 2 ? 'rounded-lg' : 'rounded-full'} opacity-30`}
            style={{
              width: particle.size,
              height: particle.type === 1 ? particle.size * 0.6 : particle.size,
              left: `${particle.posX}%`,
              top: `${particle.posY}%`,
              filter: `blur(${particle.blur}px)`,
              opacity: particle.opacity,
              background: particle.type === 1
                ? themes[currentTheme]?.secondary || themes.purple.secondary
                : particle.type === 2
                  ? themes[currentTheme]?.tertiary || themes.purple.tertiary
                  : themes[currentTheme]?.accent || themes.purple.accent,
              transform: themeChanging ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1), background 1s ease-in-out',
            }}
            animate={{
              x: particle.type === 0
                ? [0, particle.amplitude, 0, -particle.amplitude, 0]
                : particle.type === 1
                  ? [0, -particle.amplitude * 0.7, 0, particle.amplitude * 0.7, 0]
                  : [0, particle.amplitude * 0.5, -particle.amplitude * 0.5, 0],
              y: particle.type === 0
                ? [0, -particle.amplitude, 0, particle.amplitude, 0]
                : particle.type === 1
                  ? [-particle.amplitude * 0.5, 0, particle.amplitude * 0.5, 0]
                  : [0, particle.amplitude * 0.7, 0, -particle.amplitude * 0.7, 0],
              opacity: [
                particle.opacity,
                particle.opacity * 1.3,
                particle.opacity * 0.8,
                particle.opacity * 1.2,
                particle.opacity
              ],
              rotate: particle.type === 2 ? [0, 5, 0, -5, 0] : 0,
            }}
            transition={{
              repeat: Infinity,
              duration: (15 + (particle.id % 10)) * particle.speed,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
        
        {/* Stars background */}
        <div 
          className="absolute inset-0 bg-stars opacity-40"
          style={{
            transform: `translate3d(${-mouseParallax.x * 0.5}px, ${-mouseParallax.y * 0.5}px, 0)`,
          }}
        />
      </motion.div>
      
      {/* Enhanced background overlay with mouse-following gradient and subtle animation */}
      <motion.div
        ref={overlayRef}
        className="fixed inset-0 opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: themeChanging ? 0.5 : 0.3,
          scale: themeChanging ? 1.05 : 1,
        }}
        transition={{
          opacity: { duration: 1.2, ease: "easeOut" },
          scale: { duration: 1.5, ease: [0.22, 0.61, 0.36, 1] }
        }}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${themes[currentTheme]?.particles || themes.purple.particles}, transparent 70%)`,
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
        }}
      />
      
      {/* Noise texture overlay for added depth */}
      <div className="fixed inset-0 noise-overlay pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}