"use client";
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Use this to trigger animations when the section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const features = [
    {
      icon: "✍️",
      title: "Tailored speech for any occasion",
      description: "Wedding, business, or TED-style talk — each speech is written specifically for your voice and audience.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: "⏱️",
      title: "24–48h delivery",
      description: "No more last-minute panic. Get your perfect speech delivered within two business days.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: "📞",
      title: "Optional input call",
      description: "Schedule a call to share details, stories, and your vision to make your speech even more personal.",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: "🔄",
      title: "2 revisions included",
      description: "Fine-tune your speech until it feels just right with two rounds of revisions included.",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: "🔒",
      title: "100% private",
      description: "Your speech stays between us. Complete confidentiality guaranteed.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "✨",
      title: "Expert craftsmanship",
      description: "Each speech is crafted with professional techniques to captivate your audience and leave a lasting impression.",
      color: "from-pink-500 to-red-500",
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
        duration: 0.7
      }
    }
  };

  return (
    <section ref={sectionRef} id="features" className="py-20 relative overflow-hidden">
      {/* Background elements with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue circle background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-blue-600/20 to-transparent opacity-50" />
        
        {/* Moving dots background */}
        <div className="absolute inset-0 bg-stars opacity-30" />
        
        {/* Animated blobs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16 reveal-container"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">What You Get</h2>
          <p className="text-lg text-indigo-100/80 max-w-2xl mx-auto">
            More than just words on a page — everything you need to deliver with confidence.
          </p>
        </motion.div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="card group backdrop-blur-sm hover:shadow-lg"
              initial={{ y: 0 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.color} mb-5 text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-indigo-100/70">{feature.description}</p>
              
              {/* Subtle accent line to mimic hellocopilot.com design */}
              <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${feature.color} opacity-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}