"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Main component that creates ink drop/splash effect
export function InkDrop({ 
  delay = 0, 
  position = 'center', 
  size = 'medium', 
  intensity = 'medium',
  color = 'black',
  scrollTrigger = true,
  children
}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  
  // Determine size class
  const sizeClass = {
    small: "w-24 h-24 md:w-32 md:h-32",
    medium: "w-40 h-40 md:w-56 md:h-56",
    large: "w-64 h-64 md:w-80 md:h-80",
    xlarge: "w-80 h-80 md:w-[32rem] md:h-[32rem]"
  }[size] || "w-40 h-40 md:w-56 md:h-56";
  
  // Determine position class
  const positionClass = {
    'top-left': "top-0 left-0",
    'top-right': "top-0 right-0",
    'top-center': "top-0 left-1/2 -translate-x-1/2",
    'center-left': "top-1/2 -translate-y-1/2 left-0",
    'center-right': "top-1/2 -translate-y-1/2 right-0",
    'bottom-left': "bottom-0 left-0",
    'bottom-right': "bottom-0 right-0",
    'bottom-center': "bottom-0 left-1/2 -translate-x-1/2",
    'center': "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  }[position] || "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  
  // Determine splash intensity
  const intensityValue = {
    light: 0.4,
    medium: 0.7,
    high: 1
  }[intensity] || 0.7;
  
  // Determine color
  const colorValue = {
    black: "rgba(0, 0, 0, 0.8)",
    white: "rgba(255, 255, 255, 0.85)",
    purple: "rgba(88, 28, 135, 0.8)",
    blue: "rgba(30, 58, 138, 0.8)",
    red: "rgba(153, 27, 27, 0.8)",
    gold: "rgba(161, 98, 7, 0.8)"
  }[color] || "rgba(0, 0, 0, 0.8)";
  
  // Create GSAP animation for ink splash when triggered
  useEffect(() => {
    if (!ref.current) return;
    
    if (scrollTrigger) {
      // Create scroll-triggered ink animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      
      tl.fromTo(ref.current, 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: intensityValue, 
          duration: 1.2, 
          ease: "power3.out",
          delay: delay
        }
      );
      
      // Create splash droplets when main drop appears
      const droplets = ref.current.querySelectorAll('.ink-droplet');
      droplets.forEach((droplet, i) => {
        tl.fromTo(droplet,
          { scale: 0, x: 0, y: 0, opacity: 0 },
          { 
            scale: 0.3 + Math.random() * 0.7,
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: intensityValue * 0.8,
            duration: 0.8,
            delay: 0.1 + (i * 0.05),
            ease: "power2.out"
          },
          "<0.1"
        );
      });
      
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    } else {
      // Manual animation control
      if (isInView) {
        controls.start({
          scale: 1,
          opacity: intensityValue,
          transition: { 
            duration: 1, 
            ease: [0.25, 0.1, 0.25, 1],
            delay: delay
          }
        });
      }
    }
  }, [scrollTrigger, isInView, delay, intensityValue]);
  
  return (
    <div className={`absolute ${positionClass} ${sizeClass} z-10 pointer-events-none`}>
      <motion.div
        ref={ref}
        className="relative w-full h-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={scrollTrigger ? {} : controls}
      >
        {/* Main ink blob */}
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full drop-shadow-xl"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M46.7,-78.5C59.2,-71.1,67.8,-56.4,74.6,-41.8C81.4,-27.3,86.5,-13.6,84.3,-1.3C82.1,11.1,72.7,22.2,64.3,33.3C55.9,44.4,48.6,55.5,38.5,63.8C28.4,72.1,15.5,77.7,0.5,77C-14.5,76.4,-29,69.4,-41.2,61.1C-53.4,52.8,-63.4,43.1,-69.6,31C-75.8,18.8,-78.1,4.2,-76.1,-9.9C-74.1,-24,-67.9,-37.6,-58.3,-47.6C-48.8,-57.7,-35.9,-64.1,-22.8,-70.9C-9.7,-77.7,3.5,-84.8,19,-84.4C34.6,-84,52.6,-76.1,46.7,-78.5Z"
            fill={colorValue}
            whileHover={{ 
              d: "M43.1,-73.8C55.3,-69.1,64.4,-58,72.2,-45.6C80,-33.3,86.5,-19.8,85.4,-6.8C84.4,6.1,75.8,18.5,67.8,30.2C59.8,41.8,52.4,52.8,42.1,60.8C31.8,68.9,18.5,74,3.7,75.2C-11.1,76.3,-25.8,73.4,-36.6,66.2C-47.4,59,-54.4,47.6,-63.7,36C-73.1,24.4,-84.7,12.2,-87.3,-1.5C-89.9,-15.2,-83.5,-30.3,-73.3,-41.3C-63.1,-52.3,-49.1,-59,-36,-63.4C-22.9,-67.8,-10.7,-69.9,2.6,-72.1C15.9,-74.3,30.9,-78.4,43.1,-73.8Z",
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />
        </svg>
        
        {/* Small ink droplets */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className="ink-droplet absolute rounded-full"
            style={{ 
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              top: '50%',
              left: '50%',
              backgroundColor: colorValue,
              zIndex: 5
            }}
          />
        ))}
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Component for ink writing effect (text appearing as if written with ink)
export function InkWriteText({ text, speed = 'medium', color = 'black', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Determine speed value in ms per character
  const speedValue = {
    slow: 150,
    medium: 80,
    fast: 40
  }[speed] || 80;
  
  // Determine color class
  const colorClass = {
    black: "text-black",
    white: "text-white",
    purple: "text-purple-900",
    blue: "text-blue-900",
    gold: "text-amber-800"
  }[color] || "text-black";
  
  // Animate text writing effect
  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
      let index = 0;
      const timer = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.substring(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, speedValue);
      
      return () => clearInterval(timer);
    }
  }, [isInView, text, speedValue, isAnimating]);
  
  return (
    <div 
      ref={ref}
      className={`relative inline-block ${colorClass} ${className}`}
      style={{ 
        fontFamily: "'EB Garamond', 'Playfair Display', serif"
      }}
    >
      {displayText}
      <motion.span 
        className={`inline-block ${colorClass}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isAnimating && displayText.length < text.length ? [1, 0, 1] : 0 }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        |
      </motion.span>
    </div>
  );
}

// Component for ink line divider that animates on scroll
export function InkLine({ 
  direction = 'horizontal', 
  length = 'medium', 
  thickness = 'medium', 
  color = 'black', 
  animate = true,
  className = ''
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });
  
  // Determine direction class
  const isHorizontal = direction === 'horizontal';
  
  // Determine length class
  const lengthClass = {
    small: isHorizontal ? "w-20 md:w-32" : "h-20 md:h-32",
    medium: isHorizontal ? "w-40 md:w-64" : "h-40 md:h-64",
    large: isHorizontal ? "w-64 md:w-96" : "h-64 md:h-96",
    full: isHorizontal ? "w-full" : "h-full"
  }[length] || (isHorizontal ? "w-40 md:w-64" : "h-40 md:h-64");
  
  // Determine thickness class
  const thicknessClass = {
    thin: isHorizontal ? "h-0.5" : "w-0.5",
    medium: isHorizontal ? "h-1" : "w-1",
    thick: isHorizontal ? "h-2" : "w-2"
  }[thickness] || (isHorizontal ? "h-1" : "w-1");
  
  // Determine color class
  const colorValue = {
    black: "rgba(0, 0, 0, 0.8)",
    white: "rgba(255, 255, 255, 0.85)",
    purple: "rgba(88, 28, 135, 0.8)",
    blue: "rgba(30, 58, 138, 0.8)",
    red: "rgba(153, 27, 27, 0.8)",
    gold: "rgba(161, 98, 7, 0.8)"
  }[color] || "rgba(0, 0, 0, 0.8)";
  
  return (
    <div 
      ref={ref}
      className={`relative flex items-center justify-center ${className}`}
    >
      <motion.div 
        className={`${thicknessClass} ${lengthClass} rounded-full`}
        style={{ 
          backgroundColor: colorValue,
          maskImage: isHorizontal 
            ? 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
            : 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: isHorizontal 
            ? 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
            : 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
        initial={animate ? { 
          scaleX: isHorizontal ? 0 : 1, 
          scaleY: isHorizontal ? 1 : 0,
          opacity: 0 
        } : { opacity: 1 }}
        animate={animate && isInView ? { 
          scaleX: 1, 
          scaleY: 1,
          opacity: 1 
        } : {}}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.1, 0.25, 1],
          opacity: { duration: 0.4 }
        }}
      />
      
      {/* Ink splatter dots along the line */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            backgroundColor: colorValue,
            left: isHorizontal ? `${10 + (i * 20)}%` : '50%',
            top: isHorizontal ? '50%' : `${10 + (i * 20)}%`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.7
          }}
          initial={animate ? { scale: 0, opacity: 0 } : { opacity: 0.7 }}
          animate={animate && isInView ? { 
            scale: [0, 1.5, 1],
            opacity: 0.7
          } : {}}
          transition={{
            duration: 0.4,
            delay: 0.8 + (i * 0.1),
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}

// Ink reveal effect for sections/images
export function InkReveal({ children, direction = 'left-to-right', delay = 0, color = 'black', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  
  // Determine direction settings
  const directionSettings = {
    'left-to-right': { 
      initial: { left: 0, right: '100%' },
      animate: { left: 0, right: 0 }
    },
    'right-to-left': {
      initial: { right: 0, left: '100%' },
      animate: { right: 0, left: 0 }
    },
    'top-to-bottom': {
      initial: { top: 0, bottom: '100%' },
      animate: { top: 0, bottom: 0 }
    },
    'bottom-to-top': {
      initial: { bottom: 0, top: '100%' },
      animate: { bottom: 0, top: 0 }
    },
    'center-out': {
      initial: { top: '50%', bottom: '50%', left: '50%', right: '50%' },
      animate: { top: 0, bottom: 0, left: 0, right: 0 }
    }
  }[direction] || { 
    initial: { left: 0, right: '100%' },
    animate: { left: 0, right: 0 }
  };
  
  // Determine color value
  const colorValue = {
    black: "rgba(0, 0, 0, 0.9)",
    white: "rgba(255, 255, 255, 0.95)",
    purple: "rgba(88, 28, 135, 0.9)",
    blue: "rgba(30, 58, 138, 0.9)",
    red: "rgba(153, 27, 27, 0.9)",
    gold: "rgba(161, 98, 7, 0.9)"
  }[color] || "rgba(0, 0, 0, 0.9)";
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Children with initial hidden state */}
      <div className="opacity-0 transition-opacity duration-500" 
        style={{ opacity: isInView ? 1 : 0 }}>
        {children}
      </div>
      
      {/* Ink reveal overlay */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{ 
          backgroundColor: colorValue,
          pointerEvents: 'none'
        }}
        initial={directionSettings.initial}
        animate={isInView ? directionSettings.animate : directionSettings.initial}
        transition={{
          duration: 1.2,
          ease: [0.65, 0, 0.35, 1],
          delay: delay
        }}
      />
    </div>
  );
}

// Export all components
export default {
  InkDrop,
  InkWriteText,
  InkLine,
  InkReveal
};