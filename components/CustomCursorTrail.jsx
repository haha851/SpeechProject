"use client";
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursorTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorDots, setCursorDots] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailLength = 12; // Number of trail dots
  const cursorRef = useRef(null);
  
  // Set up cursor trail
  useEffect(() => {
    // Initialize cursor trail dots
    const initialDots = Array.from({ length: trailLength }).map((_, i) => ({
      id: i,
      x: 0,
      y: 0,
      size: Math.max(4, (trailLength - i) / 1.5), // Larger dots at the front, smaller at the back
      delay: i * 0.015, // Staggered timing
      opacity: 1 - (i / trailLength),
    }));
    
    setCursorDots(initialDots);
    
    // Handle mouse movement
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    // Handle mouse leaving the window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    // Handle mouse entering the window
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    // Update cursor trail position with delayed followers
    let rafId;
    const updateTrailPositions = () => {
      setCursorDots(prevDots => 
        prevDots.map((dot, index) => {
          // Calculate how far behind this dot should follow (earlier dots follow more closely)
          const followFactor = 0.2 + (index * 0.05);
          
          // Smooth follow logic - move a percentage of the distance to the leader
          const targetX = index === 0 ? mousePosition.x : prevDots[index - 1].x;
          const targetY = index === 0 ? mousePosition.y : prevDots[index - 1].y;
          
          return {
            ...dot,
            x: dot.x + (targetX - dot.x) * followFactor,
            y: dot.y + (targetY - dot.y) * followFactor
          };
        })
      );
      
      rafId = requestAnimationFrame(updateTrailPositions);
    };
    
    // Start animation loop
    updateTrailPositions();
    
    // Listen for mouse events
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [mousePosition.x, mousePosition.y, isVisible]);
  
  // Audio feedback on interaction
  const [hoverElements, setHoverElements] = useState([]);
  useEffect(() => {
    // Find all interactive elements to apply hover sound effect
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    setHoverElements(interactiveElements);
    
    // Load subtle hover sound
    const audio = new Audio();
    audio.src = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFzb25pY1N0dWRpb3MuY29tAFRYWFgAAAAhAAADaWRlbnRpZmllcgBTb2Z0IEJ1dHRvbiBDbGljawBUWFhYAAAAGwAAAy9zb2Z0d2FyZQBMYXZmNTguMjkuMTAwAABUSVQyAAAABgAAAklEMwA=';
    audio.volume = 0.1;
    
    // Add hover effects to interactive elements
    const playHoverSound = () => {
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Audio playback prevented: ", e));
      }
    };
    
    const enhanceElement = (el) => {
      // Add hover sound effect to all interactive elements
      el.addEventListener('mouseenter', playHoverSound);
      
      // Add cursor glow effect when hovering interactive elements
      el.addEventListener('mouseenter', () => {
        if (cursorRef.current) {
          cursorRef.current.classList.add('cursor-expanded');
        }
      });
      
      // Remove glow effect when leaving interactive elements
      el.addEventListener('mouseleave', () => {
        if (cursorRef.current) {
          cursorRef.current.classList.remove('cursor-expanded');
        }
      });
    };
    
    // Apply effects to all interactive elements
    interactiveElements.forEach(enhanceElement);
    
    // Cleanup
    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', playHoverSound);
        el.removeEventListener('mouseenter', () => {
          if (cursorRef.current) cursorRef.current.classList.remove('cursor-expanded');
        });
        el.removeEventListener('mouseleave', () => {
          if (cursorRef.current) cursorRef.current.classList.remove('cursor-expanded');
        });
      });
    };
  }, []);
  
  return (
    <div className="cursor-container fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="cursor-dot fixed rounded-full bg-white mix-blend-difference z-[9999] shadow-glow transition-all duration-300"
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        initial={{ opacity: 0, x: 0, y: 0 }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
          default: { duration: 0, ease: "linear" }
        }}
        style={{
          height: 24,
          width: 24,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Cursor trail dots */}
      {cursorDots.map((dot) => (
        <motion.div
          key={dot.id}
          className="cursor-trail-dot fixed rounded-full bg-white mix-blend-difference"
          animate={{
            x: dot.x,
            y: dot.y,
            opacity: isVisible ? dot.opacity * 0.6 : 0,
          }}
          initial={{ opacity: 0 }}
          transition={{
            default: {
              duration: 0,
              ease: "linear",
              delay: dot.delay
            },
            opacity: { duration: 0.3 }
          }}
          style={{
            height: dot.size,
            width: dot.size,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      <style jsx global>{`
        .cursor-expanded {
          transform: translate(-50%, -50%) scale(1.5) !important;
          background-color: rgba(255, 255, 255, 0.8) !important;
          box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.3) !important;
          mix-blend-mode: overlay !important;
        }
        
        /* Hide default cursor when our custom cursor is active */
        body {
          cursor: none;
        }
        
        /* But keep default cursors for specific elements that need them */
        input, textarea, select, [contenteditable] {
          cursor: text;
        }
        
        button, a, [role="button"] {
          cursor: pointer;
        }
        
        /* Shadow glow for main cursor */
        .shadow-glow {
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}