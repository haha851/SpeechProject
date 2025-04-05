"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from './ThemeContext';

export default function HeroSection({ scrollY }) {
  const { isDarkMode } = useTheme();
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  const heroRef = useRef(null);
  const starsRef = useRef(null);
  const planetRef = useRef(null);
  const cloudsRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [audioFeedback, setAudioFeedback] = useState(null);
  
  // For smoother parallax calculations
  const [viewportHeight, setViewportHeight] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Initialize GSAP animations
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    if (headingRef.current) {
      // Main heading parallax effect on scroll
      gsap.to(headingRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        opacity: 0.6,
        ease: "power2.out"
      });
    }
    
    // Create subtle particle movement on scroll
    setTimeout(() => {
      const particles = document.querySelectorAll('.particle-element');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          },
          y: (i % 2 === 0) ? 80 : -80,
          x: (i % 3 === 0) ? 40 : -40,
          opacity: 0.2,
          ease: "power1.out"
        });
      });
    }, 1000);
    
    // Setup interactive hover sound effects
    const audio = new Audio();
    audio.src = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzb25pY1N0dWRpb3MuY29tAFRYWFgAAAAhAAADaWRlbnRpZmllcgBTb2Z0IEJ1dHRvbiBDbGljawBUWFhYAAAAGwAAAy9zb2Z0d2FyZQBMYXZmNTguMjkuMTAwAABUSVQyAAAABgAAAklEMwA=';
    audio.volume = 0.2;
    setAudioFeedback(audio);
  }, []);
  
  // Play subtle sound on interaction
  const playInteractionSound = () => {
    if (audioFeedback) {
      audioFeedback.currentTime = 0;
      audioFeedback.play().catch(e => console.log("Audio playback prevented: ", e));
    }
  };
  
  
  useEffect(() => {
    // Set initial viewport height
    setViewportHeight(window.innerHeight);
    
    // Generate decorative particles
    const generateParticles = () => {
      const newParticles = [];
      // Create different particle types for more visual variety
      for (let i = 0; i < 40; i++) {
        // Randomize properties for more organic feel
        const type = Math.floor(Math.random() * 3); // 0=dot, 1=star, 2=ring
        const depth = Math.random(); // 0-1, used for parallax effect based on depth
        
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: type === 1 ? Math.random() * 6 + 2 : Math.random() * 4 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.5 + 0.2,
          color: type === 1 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          blur: type === 2 ? 2 : type === 1 ? 0.5 : 1,
          type: type,
          depth: depth,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
        });
      }
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Handle resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // Enhanced parallax effect for mouse movement
    const handleMouseMove = (e) => {
      if (!starsRef.current || !planetRef.current || !cloudsRef.current) return;
      
      // Store mouse position for additional effects
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;
      
      // Apply enhanced 3D parallax transformations
      starsRef.current.style.transform = `translateX(${x * 2}px) translateY(${y * 2}px) scale(1.01) rotateX(${y * 0.05}deg) rotateY(${-x * 0.05}deg)`;
      planetRef.current.style.transform = `translateX(${x * 4}px) translateY(${y * 4}px) rotate(${x * 0.5}deg) scale(${1 + Math.abs(y) * 0.002})`;
      cloudsRef.current.style.transform = `translateX(${x * -3}px) translateY(${y * -3}px) scale(${1 + Math.abs(y) * 0.01}) rotateZ(${x * 0.02}deg)`;
      
      // Add enhanced 3D transformation to content with custom cursor response
      if (contentRef.current) {
        contentRef.current.style.transform = `perspective(1000px) rotateX(${y * 0.2}deg) rotateY(${-x * 0.2}deg) translateZ(${Math.abs(x * y) * 0.01}px)`;
        contentRef.current.style.transition = 'transform 0.1s cubic-bezier(0.22, 0.61, 0.36, 1)';
        
        // Add custom cursor effect that follows mouse position
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
          cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
          cursor.style.opacity = 1;
        }
      }
    };
    
    // Enhanced scroll effect
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      
      // Enhanced scroll-based animations
      if (starsRef.current) {
        const opacity = Math.max(0.2, 1 - (scrollPos / (viewportHeight * 0.5)));
        const blur = Math.min(3, scrollPos / 200);
        starsRef.current.style.opacity = opacity;
        starsRef.current.style.filter = `blur(${blur}px)`;
      }
      
      // Apply advanced effects to planetary elements on scroll
      if (planetRef.current) {
        const scale = 1 + (scrollPos / viewportHeight) * 0.1;
        const rotate = (scrollPos / viewportHeight) * 3;
        planetRef.current.style.filter = `hue-rotate(${scrollPos / 20}deg) brightness(${1 - scrollPos / (viewportHeight * 2)})`;
        planetRef.current.style.transform = `translateY(${scrollPos * 0.25}px) scale(${scale}) rotate(${rotate}deg)`;
      }
      
      // Adjust cloud parallax based on scroll
      if (cloudsRef.current) {
        const translateY = scrollPos * 0.35;
        const opacity = Math.max(0.1, 0.4 - (scrollPos / viewportHeight) * 0.3);
        cloudsRef.current.style.transform = `translateY(${translateY}px)`;
        cloudsRef.current.style.opacity = opacity;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Animation intervals
    // Enhanced particle animation with more natural movement
    const particleAnimInterval = setInterval(() => {
      setParticles(prev => prev.map(p => {
        // Calculate mouse influence for particles (slower particles react more to mouse)
        const mouseInfluenceX = (p.depth * (mousePosition.x / window.innerWidth - 0.5)) * 0.5;
        const mouseInfluenceY = (p.depth * (mousePosition.y / window.innerHeight - 0.5)) * 0.5;
        
        return {
          ...p,
          y: (p.y + p.speed * (1 + mouseInfluenceY)) % 100,
          x: (p.x + mouseInfluenceX * p.speed * 0.2 + (Math.random() - 0.5) * 0.05) % 100,
          rotation: p.rotation + p.rotationSpeed,
          // Add slight random variations for more natural movement
          size: p.type === 1 ? p.size + (Math.random() - 0.5) * 0.05 : p.size,
          opacity: p.opacity + (Math.random() - 0.5) * 0.01
        };
      }));
    }, 30); // Faster interval for smoother animation
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(particleAnimInterval);
    };
  }, [viewportHeight]);
  
  // Calculate enhanced parallax positions based on scroll
  const calculateParallax = (speed) => {
    return scrollY ? -scrollY * speed : 0;
  };
  
  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 0.61, 0.36, 1],
        delay: 0.8,
        staggerChildren: 0.1 // Add stagger for children elements
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 0.61, 0.36, 1],
        delay: 1.0,
        staggerChildren: 0.1 // Add stagger for children elements
      }
    }
  };

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen pt-24 overflow-hidden"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}>
      
      {/* Custom cursor element that follows mouse */}
      <div className="custom-cursor fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.3s ease',
          opacity: 0,
          boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(4px)'
        }}
      />
      {/* Stars background with enhanced parallax */}
      <div
        ref={starsRef}
        className="absolute inset-0 z-0 bg-stars animate-gradient"
        style={{
          willChange: 'transform, opacity, filter',
          transform: `translateY(${calculateParallax(0.12)}px)`,
          backgroundSize: '200% 200%'
        }}
      />
      
      {/* Animated floating particles */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className={`absolute pointer-events-none ${
              particle.type === 1 ? 'star-shape' :
              particle.type === 2 ? 'rounded-full border border-white/30' : 'rounded-full'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              backgroundColor: particle.type === 2 ? 'transparent' : particle.color,
              filter: `blur(${particle.blur}px)`,
              transform: `translateZ(${particle.depth * -20}px) rotate(${particle.rotation}deg)`,
              willChange: 'transform, opacity',
              transformStyle: 'preserve-3d'
            }}
            animate={{
              opacity: [particle.opacity, particle.opacity * 1.3, particle.opacity],
              scale: particle.type === 1 ? [1, 1.2, 1] : 1,
              boxShadow: particle.type === 1 ? [
                '0 0 0px rgba(255,255,255,0.2)',
                '0 0 3px rgba(255,255,255,0.6)',
                '0 0 0px rgba(255,255,255,0.2)'
              ] : 'none'
            }}
            transition={{
              duration: 2 + particle.id % 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Add animated liquid border effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute -top-[30%] -left-[20%] w-[60%] h-[40%] opacity-20 pointer-events-none animate-liquid"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(79, 70, 229, 0.2))',
            willChange: 'transform, border-radius',
            filter: 'blur(60px)'
          }}
          animate={{
            filter: ['blur(60px)', 'blur(70px)', 'blur(60px)'],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[40%] opacity-20 pointer-events-none animate-liquid"
          style={{
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.2))',
            willChange: 'transform, border-radius',
            filter: 'blur(60px)',
            animationDelay: '3s'
          }}
          animate={{
            filter: ['blur(60px)', 'blur(80px)', 'blur(60px)'],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Enhanced planetary elements - middle parallax with rotation */}
      <div
        ref={planetRef}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          willChange: 'transform, filter, opacity',
          transform: `translateY(${calculateParallax(0.25)}px) rotate(${calculateParallax(0.02)}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-600/20 blur-[100px] animate-breathe"
          animate={{
            filter: ["blur(100px)", "blur(120px)", "blur(100px)"],
            backgroundImage: [
              'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(67, 56, 202, 0.1) 50%, rgba(79, 70, 229, 0) 80%)',
              'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.1) 50%, rgba(109, 40, 217, 0) 80%)',
              'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(67, 56, 202, 0.1) 50%, rgba(79, 70, 229, 0) 80%)'
            ]
          }}
        />
        
        <motion.div
          className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]"
          animate={{
            filter: ["blur(120px)", "blur(150px)", "blur(120px)"],
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ willChange: 'transform, filter, opacity' }}
        />
      </div>
      
      {/* Enhanced clouds/nebulas - fastest parallax with complex motion */}
      <motion.div
        ref={cloudsRef}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.4, 0.35, 0.4] }}
        transition={{
          duration: 8,
          times: [0, 0.3, 0.6, 1],
          repeat: Infinity
        }}
        style={{
          transform: `translateY(${calculateParallax(0.35)}px) rotateZ(${calculateParallax(0.01)}deg)`,
        }}
      >
        <motion.div
          className="absolute top-[10%] left-[5%] w-[40%] h-[30%] rounded-full bg-purple-500/20 blur-[100px] animate-float animate-wave"
          animate={{
            filter: ["blur(100px)", "blur(120px)", "blur(90px)"],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-[60%] left-[60%] w-[30%] h-[40%] rounded-full bg-indigo-500/20 blur-[100px] animate-float-x"
          animate={{
            x: [-20, 20, -20],
            filter: ["blur(120px)", "blur(100px)", "blur(120px)"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-[30%] right-[10%] w-[25%] h-[25%] rounded-full bg-pink-500/20 blur-[100px] animate-rotate-slow"
          animate={{
            scale: [1, 1.1, 1],
            filter: ["blur(100px)", "blur(120px)", "blur(100px)"]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Enhanced content with interactive animations */}
      <motion.div
        ref={contentRef}
        className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          willChange: "transform"
        }}
      >
        <motion.h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          style={{
            lineHeight: "1.2", /* Fix for the tagline spacing issue */
            letterSpacing: "0.01em", /* Proper kerning for headings */
          }}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="gradient-text-animated gradient-text-purple inline-block">
            <motion.span
              className="inline-block hover:animate-pulse-slow transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }
                }
              }}
              onMouseEnter={playInteractionSound}
            >Need</motion.span>{" "}
            <motion.span
              className="inline-block hover:animate-pulse-slow transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }
                }
              }}
              onMouseEnter={playInteractionSound}
            >a</motion.span>{" "}
            <motion.span
              className="inline-block hover:animate-pulse-slow transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }
                }
              }}
              onMouseEnter={playInteractionSound}
            >Powerful,</motion.span>{" "}
            <motion.span
              className="inline-block hover:animate-pulse-slow transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }
                }
              }}
              onMouseEnter={playInteractionSound}
            >Personalized</motion.span>{" "}
          </div>
          <div className="gradient-text-animated gradient-text-purple inline-block mt-2">
            <motion.span
              className="inline-block hover:animate-pulse-slow transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }
                }
              }}
              onMouseEnter={playInteractionSound}
            >Speech</motion.span>{" "}
            <motion.span
              className="inline-block hover:animate-pulse-slow transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }
                }
              }}
              onMouseEnter={playInteractionSound}
            >—</motion.span>{" "}
            <motion.span
              className="inline-block hover:animate-pulse-slow transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }
                }
              }}
              onMouseEnter={playInteractionSound}
            >Fast?</motion.span>
          </div>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-3xl text-indigo-100/90"
          style={{ letterSpacing: "0.01em", lineHeight: "1.6" }}
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="relative inline-block"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }
              }
            }}
          >
            Wedding, business, or TEDx —
          </motion.span>{" "}
          <motion.span
            className="relative inline-block"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }
              }
            }}
          >
            <span className="relative z-10 shimmer-text font-medium">I'll make you unforgettable.</span>
            <motion.span
              className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-indigo-300 to-purple-300"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </motion.span>
        </motion.p>
        
        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 0.7,
            ease: [0.22, 0.61, 0.36, 1]
          }}
        >
          {/* Button glow effect container */}
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/30 to-pink-500/20 rounded-full blur-xl"
            animate={{
              scale: [0.9, 1.1, 0.9],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.span
            className="relative inline-block px-6 py-3 text-white rounded-full text-sm font-medium glass micro-border shadow-layered"
            whileHover={{
              y: -3,
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
              borderColor: "rgba(139, 92, 246, 0.5)"
            }}
            transition={{
              type: "spring",
              stiffness: 600,
              damping: 15
            }}
            onMouseEnter={playInteractionSound}
            onMouseMove={(e) => {
              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              
              el.style.transform = `translate3d(0, -3px, 0) rotateX(${y * 0.05}deg) rotateY(${-x * 0.05}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
            }}
          >
            <motion.span
              className="inline-block mr-2 particle-element"
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 1.5, delay: 2, repeat: 2, repeatDelay: 7 }}
            >
              🎯
            </motion.span>
            Limited-time 25% launch discount
          </motion.span>
          
          <motion.div
            className="absolute -z-10 inset-0 rounded-full bg-indigo-500/30 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Completely redesigned circular button with interactive effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-20 mt-8"
          transition={{
            delay: 1.4,
            duration: 0.8,
            ease: [0.22, 0.61, 0.36, 1]
          }}
        >
          {/* Main circular button container */}
          <motion.div
            className="relative w-64 h-64 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Outer glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-600/30 via-purple-500/30 to-violet-500/30 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Ring animation */}
            <motion.div 
              className="absolute inset-0 rounded-full border border-white/20"
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(139, 92, 246, 0.3)",
                  "0 0 0 10px rgba(139, 92, 246, 0.1)",
                  "0 0 0 20px rgba(139, 92, 246, 0)"
                ],
                scale: [0.95, 1, 1.05],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main button with glass effect */}
            <motion.a
              href="#cta"
              className="absolute inset-4 rounded-full bg-purple-800/40 backdrop-blur-md flex items-center justify-center overflow-hidden z-20 border border-white/20 shadow-lg"
              initial={{ boxShadow: "inset 0 0 20px rgba(139, 92, 246, 0.3)" }}
              whileHover={{ 
                boxShadow: "inset 0 0 30px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)" 
              }}
              onMouseEnter={playInteractionSound}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                // Change gradient position based on mouse position
                el.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(139, 92, 246, 0.5), rgba(91, 33, 182, 0.3))`;
                
                // Add 3D rotation effect
                const rotateX = (y - 0.5) * 10;
                const rotateY = (x - 0.5) * -10;
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(107, 33, 168, 0.4)';
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
              }}
            >
              <div className="relative z-10 text-center">
                <motion.span
                  className="block text-white text-xl font-semibold"
                  style={{ textShadow: '0 2px 10px rgba(139, 92, 246, 0.8)' }}
                  animate={{ opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Start My Speech
                </motion.span>
                
                <motion.div 
                  className="mt-2 flex justify-center"
                  initial={{ y: 0 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>
              
              {/* Inner light effect that follows mouse */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-30"
                initial={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3), transparent 70%)" }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Enhanced floating speaker figure with advanced animations */}
        <motion.div
          className="absolute right-[5%] bottom-[10%] w-[200px] md:w-[300px] pointer-events-none z-10"
          initial={{ opacity: 0, x: 100, rotate: 5 }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: 0
          }}
          transition={{
            delay: 1.8,
            duration: 1,
            ease: [0.22, 0.61, 0.36, 1]
          }}
          style={{
            transform: `translateY(${calculateParallax(-0.15)}px)`,
            filter: `drop-shadow(0 20px 30px rgba(79, 70, 229, 0.4))`
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 1, 0, -1, 0],
              scale: [1, 1.01, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path
                d="M150 50C130 50 113.5 66.5 113.5 86.5V150C113.5 170 130 186.5 150 186.5C170 186.5 186.5 170 186.5 150V86.5C186.5 66.5 170 50 150 50Z"
                fill="rgba(255, 255, 255, 0.9)"
              />
              <path
                d="M200 150C200 177.6 177.6 200 150 200C122.4 200 100 177.6 100 150"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M150 200V230M120 230H180"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle
                cx="150"
                cy="150"
                r="100"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="5"
                strokeDasharray="10 5"
              />
            </svg>
          </motion.div>
          
          {/* Accent glow effect */}
          <motion.div
            className="absolute -inset-10 bg-indigo-500/20 rounded-full blur-3xl -z-10"
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Enhanced scroll indicator with interactive animations */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2.5,
          duration: 0.8,
          ease: [0.22, 0.61, 0.36, 1]
        }}
      >
        <motion.span
          className="text-sm mb-3 opacity-70"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll to explore
        </motion.span>
        <motion.div
          className="w-6 h-10 rounded-full border border-white/30 flex items-center justify-center p-1"
          animate={{
            y: [0, 5, 0],
            borderColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.3)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          <motion.div
            className="w-1.5 h-3 bg-white/50 rounded-full"
            animate={{
              y: [0, 5, 0],
              opacity: [0.5, 0.8, 0.5],
              height: ["8px", "12px", "8px"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Advanced indicator animation */}
        <motion.div
          className="absolute -bottom-2 opacity-30"
          animate={{
            opacity: [0.3, 0.1, 0.3],
            height: ["8rem", "9rem", "8rem"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Add custom script for browser-based animations */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', () => {
          // Detect device capabilities
          const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          const supportsHoverMedia = window.matchMedia('(hover: hover)').matches;
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          // Apply device-specific optimizations
          if (isTouchDevice) {
            document.body.classList.add('touch-device');
          }
          
          if (!supportsHoverMedia) {
            document.body.classList.add('no-hover');
          }
          
          if (prefersReducedMotion) {
            document.body.classList.add('reduced-motion');
          }
        });
      ` }} />
    </section>
  );
}