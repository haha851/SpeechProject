"use client";
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const steps = [
    {
      number: "01",
      title: "Tell me your story",
      description: "Share your thoughts, stories, and goals for the speech. The more details, the better the result.",
      icon: "💬"
    },
    {
      number: "02",
      title: "I write a killer draft",
      description: "Using your input, I craft a speech that sounds authentically like you, but better than you could write yourself.",
      icon: "✏️"
    },
    {
      number: "03",
      title: "You deliver with confidence",
      description: "Receive your polished speech, review it, request any adjustments, and then deliver it to a captivated audience.",
      icon: "🎤"
    }
  ];
// Animation variants for the steps
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

return (
  <section ref={sectionRef} id="process" className="py-20 relative overflow-hidden">
    {/* Theme-specific background elements */}
    <div className="absolute inset-0 opacity-50 pointer-events-none overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute -left-20 top-20 w-96 h-96 bg-teal-600/20 rounded-full blur-[120px]"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -right-20 bottom-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-[150px]"
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut"
        }}
      />
      
      {/* Stars pattern */}
      <div className="absolute inset-0 bg-stars opacity-30" />
      
      {/* Process path line */}
      <svg className="absolute top-1/3 left-0 w-full h-40 opacity-20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,20 C300,100 700,-20 1440,20"
          stroke="url(#processGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 4"
        />
        <defs>
          <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(167, 243, 208, 0)" />
            <stop offset="50%" stopColor="rgba(167, 243, 208, 0.8)" />
            <stop offset="100%" stopColor="rgba(167, 243, 208, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16 reveal-container"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">How It Works</h2>
          <p className="text-lg text-indigo-100/80 max-w-2xl mx-auto">
            A simple, streamlined process to deliver your perfect speech in three easy steps.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Connection line between steps (desktop only) - more animated than before */}
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <div className="card h-full flex flex-col items-center text-center p-8 group backdrop-blur-sm">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-2xl shadow-lg"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {step.icon}
                    </motion.div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-emerald-900 flex items-center justify-center text-sm font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                    >
                      {step.number}
                    </motion.div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-emerald-100/70">{step.description}</p>
                
                {/* Animated highlight on hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}