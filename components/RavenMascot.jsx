"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function RavenMascot({ interactive = true, size = 'medium', position = 'top-right' }) {
  const ravenRef = useRef(null);
  const imageRef = useRef(null);
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

    // Subtle hover animation on scroll
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: ravenRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        scale: 1.05,
        transformOrigin: "center center",
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
          rotationZ: Math.min(Math.max(angle / 20, -10), 10),
          ease: "power2.out"
        });
        
        // Make the image scale slightly on hover when mouse is very close
        if (distance < 100 && imageRef.current) {
          gsap.to(imageRef.current, {
            duration: 0.3,
            scale: 1.1,
            ease: "power1.out",
          });
        } else if (imageRef.current) {
          gsap.to(imageRef.current, {
            duration: 0.5,
            scale: 1,
            ease: "power2.out"
          });
        }
      } else {
        // Reset position if mouse is far away
        gsap.to(ravenRef.current, {
          duration: 1,
          rotationZ: 0,
          ease: "power2.out"
        });
        
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            duration: 0.5,
            scale: 1,
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

      {/* Raven Image */}
      <motion.div 
        ref={imageRef}
        className="w-full h-full relative"
        animate={{
          rotate: animate ? [0, 2, 0, -2, 0] : 0,
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: animate ? Infinity : 0
        }}
      >
        <Image
          src="/images/mascot.png"
          alt="Raven Mascot"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </motion.div>

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