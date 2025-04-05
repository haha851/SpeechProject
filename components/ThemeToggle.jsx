"use client";
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useState } from 'react';

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 600); // Animation duration
  };
  
  return (
    <motion.button
      className={`relative p-2 rounded-full glass micro-border shadow-layered ${className}`}
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="w-10 h-10 flex items-center justify-center relative overflow-hidden">
        {/* Sun */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={theme === 'dark' ? { opacity: 0, rotate: -30, scale: 0.5 } : { opacity: 1, rotate: 0, scale: 1 }}
          animate={theme === 'dark' 
            ? { opacity: 0, rotate: -30, scale: 0.5 }
            : { opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg"
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            animate={{ rotate: isHovered && theme !== 'dark' ? 360 : 0 }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
          >
            <circle cx="12" cy="12" r="5"></circle>
            {/* Rays */}
            <motion.g
              animate={isHovered && theme !== 'dark' ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </motion.g>
          </motion.svg>
        </motion.div>
        
        {/* Moon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={theme === 'dark' ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: 30, scale: 0.5 }}
          animate={theme === 'dark' 
            ? { opacity: 1, rotate: 0, scale: 1 }
            : { opacity: 0, rotate: 30, scale: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="relative">
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              animate={{ rotate: isHovered && theme === 'dark' ? -360 : 0 }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </motion.svg>
            
            {/* Stars */}
            <motion.div
              className="absolute top-[-5px] right-[-3px]"
              animate={isHovered && theme === 'dark' ? 
                { scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] } : 
                { scale: 0.8, opacity: 0.4 }
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </motion.div>
            <motion.div
              className="absolute bottom-[2px] left-[0px]"
              animate={isHovered && theme === 'dark' ? 
                { scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] } : 
                { scale: 0.8, opacity: 0.4 }
              }
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </motion.div>
            <motion.div
              className="absolute top-[5px] left-[3px]"
              animate={isHovered && theme === 'dark' ? 
                { scale: [0.8, 1.4, 0.8], opacity: [0.4, 1, 0.4] } : 
                { scale: 0.8, opacity: 0.4 }
              }
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Circle overlay animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white dark:bg-black"
        initial={{ scale: 0, opacity: 0 }}
        animate={isAnimating ? 
          { scale: [0, 5, 0], opacity: [0, 0.2, 0] } : 
          { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      />
    </motion.button>
  );
}