"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function PremiumShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { isDarkMode } = useTheme();
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Auto-rotate features every 4 seconds if not hovering
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setSelectedFeature((prev) => (prev + 1) % premiumFeatures.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovering]);
  
  const premiumFeatures = [
    {
      title: "Cursor Trail Effects",
      description: "Dynamic cursor trails that respond to your movements, creating an interactive and engaging experience as you navigate the site.",
      icon: "✨",
      color: "from-indigo-600 to-violet-600",
      demo: (
        <div className="relative h-40 w-full bg-gradient-to-br from-indigo-900/30 to-violet-900/30 rounded-lg overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-24 h-24 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-[60px] h-[60px] rounded-full bg-white shadow-lg flex items-center justify-center z-20">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6L6 13L9 16L16 9L13 6Z" fill="#6366F1"/>
                  <path d="M16 9L9 16L12 19L19 12L16 9Z" fill="#8B5CF6"/>
                </svg>
              </div>
            </motion.div>
          </div>
          
          {/* Cursor trails */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-3 h-3 rounded-full bg-white/80"
              style={{ 
                left: `${30 + i * 5}%`, 
                top: `${40 + i * 3}%`,
                scale: 1 - i * 0.1,
                opacity: 1 - i * 0.1
              }}
              animate={{
                x: [0, -i * 5, 0],
                y: [0, -i * 3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05
              }}
            />
          ))}
        </div>
      )
    },
    {
      title: "Seamless Page Transitions",
      description: "Smooth transitions between sections create the illusion of separate pages, enhancing content separation and visual flow.",
      icon: "🔄",
      color: "from-cyan-600 to-blue-600",
      demo: (
        <div className="relative h-40 w-full bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-lg overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-x-0 flex justify-center">
            <motion.div 
              className="flex space-x-1 py-2"
              animate={{
                y: [0, -40, 0],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.4, 1]
              }}
            >
              <div className="w-16 h-6 rounded bg-blue-200/20 backdrop-blur-sm"></div>
              <div className="w-16 h-6 rounded bg-blue-200/20 backdrop-blur-sm"></div>
              <div className="w-16 h-6 rounded bg-blue-200/20 backdrop-blur-sm"></div>
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-900/50"
            animate={{
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-blue-600/20 to-transparent"
            animate={{
              y: [40, 0, 40],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-sm font-medium text-white/90"
            animate={{
              opacity: [0, 1, 0],
              y: [20, 0, -20]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Section
          </motion.div>
        </div>
      )
    },
    {
      title: "Parallax & 3D Effects",
      description: "Subtle depth and dimension that respond to scrolling and mouse movement, creating an immersive premium experience.",
      icon: "🌟",
      color: "from-purple-600 to-pink-600",
      demo: (
        <div className="relative h-40 w-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg overflow-hidden backdrop-blur-sm">
          <motion.div 
            className="absolute inset-0 bg-grid-pattern opacity-20"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-sm border border-white/10"
                animate={{
                  rotateY: [0, 10, 0],
                  rotateX: [0, -5, 0],
                  z: [0, 10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-3xl">✨</div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Floating elements */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-4 h-4 rounded-full bg-white/10"
              style={{ 
                left: `${20 + i * 15}%`, 
                top: `${30 + (i % 3) * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, i % 2 ? 10 : -10, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      )
    },
    {
      title: "Ambient Sound Effects",
      description: "Subtle audio cues that respond to your interactions, adding another dimension to the user experience.",
      icon: "🔊",
      color: "from-green-600 to-teal-600",
      demo: (
        <div className="relative h-40 w-full bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-lg overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-32 h-32 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Soundwave visualization */}
              <div className="relative w-20 h-20 flex items-end justify-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-2 bg-teal-400/80 rounded-t-full"
                    animate={{ 
                      height: [
                        5 + Math.random() * 10, 
                        15 + Math.random() * 20, 
                        5 + Math.random() * 10
                      ] 
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Sound waves */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/30"
              style={{
                width: `${100 + i * 40}px`,
                height: `${100 + i * 40}px`
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4
              }}
            />
          ))}
        </div>
      )
    }
  ];
  
  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Premium Experience</h2>
        <p className="text-lg text-indigo-100/80 max-w-2xl mx-auto">
          Experience a website with premium features that improve user experience, engagement, and conversion.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Features navigation */}
        <motion.div 
          className="lg:col-span-4 space-y-4"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              onMouseEnter={() => {
                setSelectedFeature(index);
                setIsHovering(true);
              }}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setSelectedFeature(index)}
              className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
                selectedFeature === index 
                  ? 'bg-white/10 backdrop-blur-sm'
                  : 'hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selected indicator */}
              {selectedFeature === index && (
                <motion.div
                  layoutId="activeFeature"
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-10`}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
              <div className="flex items-start">
                <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} mr-4`}>
                  <span className="text-lg">{feature.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-indigo-100/70">{feature.description}</p>
                </div>
              </div>
              
              {/* Left border indicator for selected item */}
              {selectedFeature === index && (
                <motion.div
                  layoutId="activeBorder"
                  className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${feature.color}`}
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Demo preview */}
        <motion.div 
          className="lg:col-span-8 bg-white/5 backdrop-blur-md rounded-2xl p-6 overflow-hidden"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-bold gradient-text bg-gradient-to-r ${premiumFeatures[selectedFeature].color}`}>
                  {premiumFeatures[selectedFeature].title}
                </h3>
                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${premiumFeatures[selectedFeature].color} bg-opacity-20`}>
                  Premium Feature
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
                {premiumFeatures[selectedFeature].demo}
              </div>
              
              <p className="text-indigo-100/70">
                {premiumFeatures[selectedFeature].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}