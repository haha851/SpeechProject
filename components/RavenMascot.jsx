"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function RavenMascot({ interactive = true, size = 'medium', position = 'top-right' }) {
  const ravenRef = useRef(null);
  const wingRef = useRef(null);
  const eyeRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Determine size class
  const sizeClass = {
    small: "w-24 h-24",
    medium: "w-40 h-40",
    large: "w-56 h-56",
    xlarge: "w-80 h-80"
  }[size] || "w-40 h-40";

  // Determine position class
  const positionClass = {
    'top-left': "top-10 left-10",
    'top-right': "top-10 right-10",
    'bottom-left': "bottom-10 left-10",
    'bottom-right': "bottom-10 right-10",
    'center': "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  }[position] || "top-10 right-10";

  // Handle scroll animations
  useEffect(() => {
    if (!ravenRef.current) return;

    // Create flying animation on scroll
    gsap.to(ravenRef.current, {
      scrollTrigger: {
        trigger: ravenRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      y: 50,
      x: -20,
      rotate: 5,
      ease: "power1.inOut"
    });

    // Wing animation on scroll
    if (wingRef.current) {
      gsap.to(wingRef.current, {
        scrollTrigger: {
          trigger: ravenRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        rotate: 10,
        transformOrigin: "top right",
        ease: "power1.inOut"
      });
    }
  }, []);

  // Handle mouse interactions
  useEffect(() => {
    if (!interactive || !ravenRef.current) return;

    const handleMouseMove = (e) => {
      // Get mouse position
      const { clientX, clientY } = e;
      
      // Get raven position
      const rect = ravenRef.current.getBoundingClientRect();
      const ravenX = rect.left + rect.width / 2;
      const ravenY = rect.top + rect.height / 2;
      
      // Calculate distance from mouse to raven
      const deltaX = clientX - ravenX;
      const deltaY = clientY - ravenY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Only trigger animation if mouse is close enough
      if (distance < 300) {
        // Calculate angle to look at mouse
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        // Update raven rotation to look at mouse
        gsap.to(ravenRef.current, {
          duration: 0.5,
          rotationZ: Math.min(Math.max(angle / 10, -15), 15),
          ease: "power2.out"
        });
        
        // Update eye to look at mouse
        if (eyeRef.current) {
          gsap.to(eyeRef.current, {
            duration: 0.3,
            x: Math.min(Math.max(deltaX / 50, -2), 2),
            y: Math.min(Math.max(deltaY / 50, -2), 2),
            ease: "power2.out"
          });
        }
        
        // Trigger wing movement if mouse is very close
        if (distance < 100 && wingRef.current) {
          gsap.to(wingRef.current, {
            duration: 0.3,
            rotate: 15,
            ease: "power1.out",
            onComplete: () => {
              gsap.to(wingRef.current, {
                duration: 0.5,
                rotate: 0,
                ease: "elastic.out(1, 0.3)"
              });
            }
          });
        }
      } else {
        // Reset position if mouse is far away
        gsap.to(ravenRef.current, {
          duration: 1,
          rotationZ: 0,
          ease: "power2.out"
        });
        
        if (eyeRef.current) {
          gsap.to(eyeRef.current, {
            duration: 0.5,
            x: 0,
            y: 0,
            ease: "power2.out"
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Animation for ink drop effect when raven appears
  const inkDropVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: [0, 0.8, 0.6],
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      className={`fixed ${positionClass} ${sizeClass} z-40 pointer-events-none`}
      ref={ravenRef}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.2
          }
        }
      }}
      onMouseEnter={() => setAnimate(true)}
      onMouseLeave={() => setAnimate(false)}
    >
      {/* Ink splash effect that appears when raven enters */}
      <motion.div 
        className="absolute -bottom-10 -left-10 right-0 w-[130%] h-[130%] z-0"
        variants={inkDropVariants}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="rgba(0,0,0,0.6)"
            d="M48.8,-63.2C62.6,-54.4,73,-39.6,79.4,-22.8C85.8,-6,88.3,12.8,83.1,29.2C77.9,45.6,65.2,59.5,49.6,66.7C34,73.8,15.5,74.2,-3.4,78.4C-22.2,82.6,-41.6,90.8,-54.4,84.3C-67.2,77.9,-73.3,56.8,-78.2,36.6C-83.1,16.4,-86.8,-2.9,-82.8,-20.4C-78.8,-37.8,-67.1,-53.5,-52.5,-62.2C-37.8,-70.9,-20.1,-72.7,-2.1,-70C15.9,-67.3,35,-72.1,48.8,-63.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Raven Silhouette */}
      <svg 
        viewBox="0 0 240 240" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <g id="raven-body">
          {/* Base shadow for depth */}
          <motion.ellipse 
            cx="120" 
            cy="130" 
            rx="85" 
            ry="60" 
            fill="rgba(0,0,0,0.2)" 
            filter="blur(10px)"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.25, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Raven body */}
          <path 
            d="M120,60 C180,60 200,110 200,150 C200,190 160,200 120,200 C80,200 40,190 40,150 C40,110 60,60 120,60" 
            fill="black" 
          />

          {/* Wings */}
          <motion.path
            ref={wingRef}
            d="M120,80 C140,70 180,90 190,120 C170,100 150,95 120,100 Z"
            fill="#111"
            animate={{ 
              rotate: animate ? [0, 5, 0] : 0 
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut",
              repeat: animate ? Infinity : 0
            }}
            style={{ transformOrigin: "40% 60%" }}
          />

          <motion.path
            d="M120,80 C100,70 60,90 50,120 C70,100 90,95 120,100 Z"
            fill="#111"
            animate={{ 
              rotate: animate ? [0, -5, 0] : 0 
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut",
              repeat: animate ? Infinity : 0,
              delay: 0.2
            }}
            style={{ transformOrigin: "60% 60%" }}
          />

          {/* Head */}
          <path 
            d="M120,70 C135,70 145,60 145,45 C145,30 135,20 120,20 C105,20 95,30 95,45 C95,60 105,70 120,70"
            fill="black"
          />

          {/* Beak */}
          <path 
            d="M120,45 L140,55 L120,60 Z" 
            fill="#222"
          />

          {/* Eye */}
          <g ref={eyeRef}>
            <circle cx="125" cy="40" r="5" fill="#f0f0f0" />
            <circle cx="126" cy="39" r="2" fill="#000" />
            
            {/* Eye shine */}
            <circle cx="124" cy="38" r="1" fill="#fff" />
          </g>

          {/* Feather details */}
          <motion.path 
            d="M140,130 C150,140 160,150 170,145 C155,150 145,140 140,130 Z"
            fill="#111"
            animate={{ 
              y: [0, -2, 0],
              rotate: [0, 2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          <motion.path 
            d="M100,130 C90,140 80,150 70,145 C85,150 95,140 100,130 Z"
            fill="#111"
            animate={{ 
              y: [0, -1, 0],
              rotate: [0, -1, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </g>
      </svg>

      {/* Subtle ink drip beneath the raven */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 overflow-hidden"
        initial={{ height: 0 }}
        animate={{ 
          height: [0, 40, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 4
        }}
      >
        <motion.div 
          className="w-full h-full bg-black rounded-b-full"
          animate={{
            y: [0, 40],
            scaleX: [1, 0.7, 1.2, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeIn"
          }}
        />
      </motion.div>
    </motion.div>
  );
}