"use client";
import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// This component wraps content and animates it based on scroll position
export function RevealOnScroll({ 
  children, 
  direction = 'up', 
  duration = 0.8, 
  delay = 0.2,
  threshold = 0.2,
  once = false
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, threshold });
  
  // Define animations based on direction
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      scale: direction === 'scale' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }
    }
  };
  
  // For SSR consistency, set initial state immediately
  useEffect(() => {
    // On initial mount
    if (!isInView && !once) {
      controls.set('hidden');
    }
  }, [controls, isInView, once]);

  // Handle view changes
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

// This component creates a staggered animation for multiple children
export function StaggerOnScroll({
  children,
  containerClassName = "",
  delay = 0.2,
  staggerDelay = 0.1,
  threshold = 0.1,
  once = false
}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, threshold });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1]
      }
    }
  };

  // For SSR consistency, set initial state immediately
  useEffect(() => {
    // On initial mount
    if (!isInView && !once) {
      controls.set('hidden');
    }
  }, [controls, isInView, once]);

  // Handle view changes
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);

  return (
    <motion.div
      ref={ref}
      className={containerClassName}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}

// This component creates a parallax effect on scroll
export function ParallaxOnScroll({
  children,
  speed = 0.1,
  direction = 'up',
  className = ""
}) {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    let startingPosition = 0;
    
    function handleScroll() {
      if (!element) return;
      
      const scrollPosition = window.scrollY;
      const elementTop = element.getBoundingClientRect().top + scrollPosition;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in viewport
      if (scrollPosition + windowHeight > elementTop && scrollPosition < elementTop + element.offsetHeight) {
        const relativeScroll = scrollPosition - elementTop + windowHeight;
        const translateY = direction === 'up' ? relativeScroll * -speed : relativeScroll * speed;
        
        // Apply different transformations based on direction
        if (direction === 'up' || direction === 'down') {
          element.style.transform = `translateY(${translateY}px)`;
        } else if (direction === 'left') {
          element.style.transform = `translateX(${-relativeScroll * speed}px)`;
        } else if (direction === 'right') {
          element.style.transform = `translateX(${relativeScroll * speed}px)`;
        } else if (direction === 'rotate') {
          element.style.transform = `rotate(${relativeScroll * speed * 0.05}deg)`;
        } else if (direction === 'scale') {
          const scale = 1 + (relativeScroll * speed * 0.0005);
          element.style.transform = `scale(${scale})`;
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);
  
  return (
    <div ref={ref} className={`${className} will-change-transform`} style={{ transition: 'transform 0.1s cubic-bezier(0.22, 0.61, 0.36, 1)' }}>
      {children}
    </div>
  );
}

// Background that changes on scroll based on sections
export function AnimatedBackground({ children, className = "" }) {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Control the opacity of floating elements based on scroll
      const floatingElements = ref.current.querySelectorAll('.floating-element');
      floatingElements.forEach((element, index) => {
        const speed = 0.0005 * (index + 1);
        const opacity = Math.max(0.2, 1 - (scrollY * speed));
        element.style.opacity = opacity;
        
        // Add some rotation based on scroll
        const rotation = scrollY * 0.01 * (index % 2 === 0 ? 1 : -1);
        element.style.transform = `rotate(${rotation}deg)`;
      });
      
      // Make background move parallax
      ref.current.style.backgroundPosition = `50% ${scrollY * 0.05}px`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div 
      ref={ref}
      className={`${className} relative overflow-hidden transition-all duration-1000`}
      style={{ 
        backgroundAttachment: "fixed",
        transition: "background-position 0.1s cubic-bezier(0.22, 0.61, 0.36, 1)"
      }}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className={`floating-element absolute rounded-full blur-3xl opacity-20 transition-all duration-1000`}
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(255, 255, 255, 0.${i + 1})`,
              transform: `rotate(${i * 10}deg)`,
              animation: `float ${10 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      {children}
    </div>
  );
}

// Moving clouds/particles background effect
export function MovingCloudsBackground({ speed = 1, opacity = 0.1, color = "white", count = 20 }) {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const container = ref.current;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'cloud-particle';
      
      // Random size, position and speed
      const size = Math.random() * 100 + 50;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = (Math.random() * 20 + 30) / speed;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        filter: blur(${size/4}px);
        opacity: ${Math.random() * opacity};
        top: ${posY}%;
        left: ${posX}%;
        animation: float ${duration}s ease-in-out infinite;
        animation-delay: -${delay}s;
        pointer-events: none;
      `;
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    return () => {
      particles.forEach(p => p.remove());
    };
  }, [speed, opacity, color, count]);
  
  return (
    <div 
      ref={ref} 
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}

export default {
  RevealOnScroll,
  StaggerOnScroll,
  ParallaxOnScroll,
  AnimatedBackground,
  MovingCloudsBackground
};