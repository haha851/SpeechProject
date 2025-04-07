"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function AIPromptSection() {
  const ref = useRef(null);
  const textareaRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { isDarkMode } = useTheme();
  
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [particles, setParticles] = useState([]);
  
  // Generate decorative particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        const type = Math.floor(Math.random() * 3); // 0=dot, 1=star, 2=ring
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
          depth: Math.random(),
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
        });
      }
      setParticles(newParticles);
    };
    
    generateParticles();
    
    // Particle animation interval
    const particleAnimInterval = setInterval(() => {
      setParticles(prev => prev.map(p => {
        return {
          ...p,
          y: (p.y + p.speed) % 100,
          x: (p.x + (Math.random() - 0.5) * 0.05) % 100,
          rotation: p.rotation + p.rotationSpeed,
          size: p.type === 1 ? p.size + (Math.random() - 0.5) * 0.05 : p.size,
          opacity: p.opacity + (Math.random() - 0.5) * 0.01
        };
      }));
    }, 30);
    
    return () => clearInterval(particleAnimInterval);
  }, []);
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [prompt]);
  
  // Handle prompt submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    
    // Simulate AI response generation
    setTimeout(() => {
      const sampleResponses = [
        "Here's a compelling opening for your speech: \"As we stand at the crossroads of innovation and tradition, we must ask ourselves not what technology can do for us, but what we can accomplish together with these powerful tools at our disposal...\"",
        "For your graduation speech, I recommend beginning with a reflection on growth: \"Four years ago, we entered these halls as individuals seeking knowledge. Today, we leave as a community, bound not just by shared experiences, but by a collective vision for the future...\"",
        "Your wedding toast could start with: \"Love, much like the finest wine, reveals its true character with time. I've had the privilege of watching Sarah and Michael's relationship mature into the extraordinary bond we celebrate today...\"",
        "For your keynote on sustainability: \"The earth doesn't belong to us; we belong to the earth. Our actions today echo into a future we're responsible for shaping. Let me share three principles that can guide us toward a more sustainable tomorrow...\""
      ];
      
      // Choose a random response
      const generatedResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      
      // Type out the response character by character
      let displayedResponse = '';
      const typingSpeed = 30; // ms per character
      
      const typeCharacter = (index) => {
        if (index < generatedResponse.length) {
          displayedResponse += generatedResponse.charAt(index);
          setResponse(displayedResponse);
          setTimeout(() => typeCharacter(index + 1), typingSpeed);
        } else {
          setIsGenerating(false);
        }
      };
      
      setShowResponse(true);
      typeCharacter(0);
    }, 1500);
  };
  
  return (
    <section ref={ref} id="ai-prompt" className="py-28 relative overflow-hidden">
      {/* Background elements with gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-purple-800/20 to-indigo-900/10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-breathe" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-breathe"
           style={{ animationDelay: '2s' }} />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-10" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className={`absolute ${
              particle.type === 1 ? 'star-shape animate-glow-pulse' :
              particle.type === 2 ? 'rounded-full border border-white/30 bg-transparent' : 'rounded-full'
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
            initial={{
              opacity: particle.opacity,
              scale: particle.type === 1 ? 1 : 1
            }}
            animate={{
              opacity: [particle.opacity, particle.opacity * 1.3, particle.opacity],
              scale: particle.type === 1 ? [1, 1.2, 1] : 1
            }}
            transition={{
              duration: 2 + particle.id % 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 text-center gradient-text-animated gradient-text-purple"
            style={{
              letterSpacing: "0.01em",
              lineHeight: "1.2"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Create with AI
          </motion.h2>
          
          <motion.p
            className="text-lg text-center mb-12 max-w-3xl mx-auto text-indigo-100/90"
            style={{ letterSpacing: "0.01em", lineHeight: "1.6" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Describe your speech needs and let our AI assistant help craft the perfect words for your moment.
          </motion.p>
          
          <motion.div
            className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-layered micro-border hover:shadow-xl transition-shadow duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(124, 58, 237, 0.25) 50%, rgba(139, 92, 246, 0.15) 100%)",
              boxShadow: `
                0 4px 8px rgba(0,0,0,0.03),
                0 8px 16px rgba(0,0,0,0.04),
                0 16px 32px rgba(0,0,0,0.05),
                inset 0 1px 1px rgba(255,255,255,0.1)
              `
            }}
            initial={{ opacity: 0, y: 20, scale: 1 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{
              scale: 1.01
            }}
          >
            {/* Light effects */}
            <motion.div
              className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-full blur-3xl"
              initial={{
                scale: 1,
                opacity: 0.2,
                x: 0,
                y: 0
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
                x: [0, 10, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <form onSubmit={handleSubmit} className="relative z-10">
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label htmlFor="prompt" className="block mb-2 text-indigo-100/90 font-medium">
                  <div className="flex items-center">
                    <motion.span
                      className="inline-block mr-2"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 1, delay: 1.5, repeat: 1 }}
                    >
                      💬
                    </motion.span>
                    Tell me about your speech
                  </div>
                </label>
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows="3"
                    placeholder="Example: I need a 5-minute wedding toast for my sister who loves hiking and works as a teacher..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 placeholder-white/30 glass shadow-inner-subtle transition-all duration-300 resize-none text-white"
                    style={{ backdropFilter: "blur(12px)" }}
                  />
                  <motion.div
                    className="absolute bottom-3 right-3 w-3 h-3 rounded-full animate-pulse-shadow"
                    animate={{
                      backgroundColor: ["rgba(99, 102, 241, 0.6)", "rgba(124, 58, 237, 0.6)", "rgba(99, 102, 241, 0.6)"]
                    }}
                    style={{
                      animationDuration: "2s"
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div className="relative inline-block">
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute -inset-3 bg-gradient-to-r from-indigo-500/20 via-purple-500/30 to-pink-500/20 rounded-full blur-xl"
                    animate={{
                      scale: [0.9, 1.1, 0.9],
                      opacity: [0.5, 0.7, 0.5],
                      filter: ["blur(15px)", "blur(20px)", "blur(15px)"]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                  />
                  
                  <motion.button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className={`relative btn px-8 py-3 text-lg shadow-layered glass micro-border z-10 ${isGenerating || !prompt.trim() ? 'opacity-70 cursor-not-allowed' : ''} ${!isGenerating && prompt.trim() ? "hover:shadow-purple" : ""}`}
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%)"
                    }}
                    initial={{ scale: 1 }}
                    whileHover={!isGenerating && prompt.trim() ? {
                      scale: 1.05,
                    } : {}}
                    whileTap={!isGenerating && prompt.trim() ? { scale: 0.98 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15
                    }}
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <motion.div
                          className="w-5 h-5 mr-2 border-t-2 border-r-2 border-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Generating...
                      </div>
                    ) : (
                      <>
                        <motion.span
                          className="inline-block mr-2"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        >
                          ✨
                        </motion.span>
                        Generate Speech
                      </>
                    )}
                    
                    {/* Button animated border */}
                    <motion.span
                      className="absolute inset-0 rounded-full border border-white/30 pointer-events-none animate-pulse-button"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            </form>
            
            {/* AI Response Section */}
            <AnimatePresence>
              {showResponse && (
                <motion.div
                  className="mt-10 pt-8 border-t border-white/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mr-4 mt-1 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2 text-white flex items-center">
                        <span>AI Assistant</span>
                        {isGenerating && (
                          <motion.div 
                            className="ml-3 flex space-x-1"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                            <motion.span 
                              className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.span 
                              className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                            />
                          </motion.div>
                        )}
                      </h3>
                      <div className="p-5 rounded-xl bg-white/5 border border-white/10 shadow-lg glass">
                        <p className="leading-relaxed whitespace-pre-line text-white/90">
                          {response}
                          {isGenerating && (
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="inline-block ml-1"
                            >
                              ▋
                            </motion.span>
                          )}
                        </p>
                      </div>
                      
                      {!isGenerating && response && (
                        <motion.div
                          className="mt-4 flex space-x-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                        >
                          <button 
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm hover:bg-white/10 transition-all duration-200"
                            onClick={() => {
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(response);
                              }
                            }}
                          >
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                              Copy
                            </div>
                          </button>
                          <button 
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm hover:bg-white/10 transition-all duration-200"
                            onClick={() => setPrompt('')}
                          >
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              New Prompt
                            </div>
                          </button>
                          <button 
                            className="px-4 py-2 rounded-lg bg-indigo-600/50 border border-indigo-500/30 text-white/90 text-sm hover:bg-indigo-500/60 transition-all duration-200"
                            onClick={() => handleSubmit({ preventDefault: () => {} })}
                          >
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              Regenerate
                            </div>
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto text-sm text-indigo-100/70">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                Opening remarks
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                Wedding toasts
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                Graduation speeches
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                Award acceptance
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                Business presentations
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                Eulogy assistance
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                Motivational speaking
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}