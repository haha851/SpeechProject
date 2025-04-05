"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useAnimation } from 'framer-motion';

export default function PricingSection() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  
  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const plans = [
    {
      name: "QuickToast",
      time: "~3 min",
      description: "Perfect for wedding toasts, retirement speeches, and brief celebratory moments.",
      bestFor: "Wedding, Toasts",
      price: "$99",
      features: [
        "3-minute expertly crafted speech",
        "Delivery within 48 hours",
        "1 round of revisions",
        "Toast template and structure",
      ]
    },
    {
      name: "ImpactTalk",
      time: "5–7 min",
      description: "Ideal for graduation speeches, TEDx-style talks, or any presentation where you need to make an impact.",
      bestFor: "TEDx, Graduation",
      price: "$149",
      isPopular: true,
      features: [
        "5-7 minute compelling speech",
        "Delivery within 48 hours",
        "2 rounds of revisions",
        "Persuasive structure",
        "Optional 15-min coaching call"
      ]
    },
    {
      name: "Executive",
      time: "7–10 min",
      description: "For business leaders, keynotes, fundraising events, and comprehensive presentations.",
      bestFor: "Corporate, Fundraising",
      price: "$199",
      features: [
        "7-10 minute professional speech",
        "Delivery within 48 hours",
        "2 rounds of revisions",
        "Executive messaging strategy",
        "Audience engagement tactics",
        "30-min coaching call included"
      ]
    },
    {
      name: "Custom",
      time: "Varies",
      description: "Tailored for complex scenarios, multi-speaker events, or speeches longer than 10 minutes.",
      bestFor: "Complex, Multi-speaker",
      price: "$250+",
      features: [
        "Custom length and complexity",
        "Priority delivery",
        "3 rounds of revisions",
        "Full consultation process",
        "Complete presentation support",
        "Follow-up coaching session"
      ]
    }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 100, 
        duration: 0.6 
      } 
    }
  };
  
  // Particle animation for the pricing section
  const particleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5 }
    }
  };

  return (
    <section ref={sectionRef} id="pricing" className="py-20 relative overflow-hidden">
      {/* Theme-specific background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/0 via-orange-800/20 to-orange-900/0" />
        
        {/* Moving background elements */}
        <motion.div 
          className="absolute -left-20 top-1/4 w-[400px] h-[400px] rounded-full bg-orange-600/20 blur-[120px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute -right-20 bottom-1/4 w-[500px] h-[500px] rounded-full bg-amber-600/20 blur-[150px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: "easeInOut"
          }}
        />
        
        {/* Stars pattern */}
        <div className="absolute inset-0 bg-stars opacity-30" />
        
        {/* Animated particles */}
        <motion.div
          className="absolute inset-0"
          variants={particleVariants}
          initial="hidden"
          animate="visible"
        >
          {/* This would contain animated particles, but we'll use a div with pseudo elements styled in CSS for simplicity */}
          <div className="particles-container"></div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          className="text-center mb-16 reveal-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">Plans & Pricing</h2>
          <p className="text-lg text-amber-100/80 max-w-2xl mx-auto">
            Choose the perfect option for your speech needs. Each plan includes thoughtful writing tailored to your voice and audience.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className={`card h-full flex flex-col backdrop-blur-sm ${
                plan.isPopular ? 'border-amber-400 shadow-lg shadow-amber-500/20 relative overflow-visible' : ''
              } ${hoveredPlan === index ? 'shadow-xl scale-[1.03]' : ''}`}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3, type: "spring" } 
              }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
            >
              {plan.isPopular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold py-1 px-4 rounded-full shadow-lg"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  MOST POPULAR
                </motion.div>
              )}
              
              <div className="mb-4">
                <motion.h3 
                  className="text-2xl font-bold mb-1"
                  animate={{
                    color: hoveredPlan === index ? "#F59E0B" : "#FFFFFF"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.name}
                </motion.h3>
                <p className="text-amber-100/70 mb-2">{plan.time} • {plan.bestFor}</p>
                <div className="flex items-baseline mb-4">
                  <motion.span 
                    className="text-3xl font-bold"
                    animate={{
                      scale: hoveredPlan === index ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.price}
                  </motion.span>
                </div>
                <p className="text-sm text-amber-100/70 mb-6">{plan.description}</p>
              </div>
              
              <div className="mb-6 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <motion.li 
                      key={fIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + fIndex * 0.1 }}
                    >
                      <div className="text-amber-400 mr-2 text-lg">✓</div>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(251, 146, 60, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-full font-medium transition-all ${
                  plan.isPopular 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-amber-500/20'
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                Start with {plan.name}
              </motion.button>
              
              {/* Animated accent line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 to-orange-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredPlan === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center reveal-container"
        >
          <h3 className="text-xl font-semibold mb-6">Add-ons Available</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div 
              className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 px-5 py-3 rounded-full text-sm backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 5px 15px rgba(251, 146, 60, 0.2)",
              }}
            >
              $25 rush delivery (24h)
            </motion.div>
            <motion.div 
              className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 px-5 py-3 rounded-full text-sm backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 5px 15px rgba(251, 146, 60, 0.2)",
              }}
            >
              $30 delivery coaching
            </motion.div>
            <motion.div 
              className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 px-5 py-3 rounded-full text-sm backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 5px 15px rgba(251, 146, 60, 0.2)",
              }}
            >
              $15 voiceover demo
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Modal for plan selection */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlan(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-gradient-to-br from-orange-900 to-amber-900 border border-amber-700/50 rounded-xl p-8 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute -top-3 -right-3 -left-3 -bottom-3 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-xl blur-xl -z-10"></div>
              
              <motion.h3 
                className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-100"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Start with {selectedPlan.name}
              </motion.h3>
              
              <motion.p 
                className="mb-6 text-amber-100/80"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Please provide some basic details to get started with your speech. I'll follow up via email to gather more information.
              </motion.p>
              
              <motion.form 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-amber-800/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-300/30" placeholder="Your full name" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-amber-800/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-amber-300/30" placeholder="email@example.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Speech Date (if known)</label>
                  <input type="date" className="w-full px-4 py-3 bg-amber-800/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Brief Description</label>
                  <textarea className="w-full px-4 py-3 bg-amber-800/30 border border-amber-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 h-24 placeholder-amber-300/30" placeholder="Tell me a bit about the speech occasion and your goals..."></textarea>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <motion.button 
                    type="button" 
                    onClick={() => setSelectedPlan(null)} 
                    className="flex-1 px-4 py-3 border border-amber-600/50 rounded-lg hover:bg-amber-800/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    type="button" 
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-medium shadow-lg shadow-orange-600/20"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 5px 15px rgba(251, 146, 60, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit & Pay
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}