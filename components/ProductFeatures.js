import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductFeatures() {
  const features = [
    {
      title: "AI Speech Generation",
      description: "Create high-quality speeches in minutes with our advanced AI models tailored to your specific event and audience",
      icon: "✍️",
      image: "/images/features/speech-generation.png"
    },
    {
      title: "Smart Editing Tools",
      description: "Polish your speech with AI-powered language enhancement and emotional tone adjustments",
      icon: "🔍",
      image: "/images/features/editing-tools.png"
    },
    {
      title: "Delivery Assistant",
      description: "Get tips and practice tools to help you deliver your speech with confidence and poise",
      icon: "🎤",
      image: "/images/features/delivery.png"
    }
  ];
  
  return (
    <section id="product-features" className="section bg-gradient-to-b from-white to-[var(--bg-light)]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--accent)] font-medium tracking-wider uppercase text-sm">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">Powerful AI at Your Fingertips</h2>
          <p className="text-[var(--text-secondary)] text-lg">Discover what our AI speech tools can do for your next important presentation</p>
        </div>
        
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-12`}
            >
              <div className="md:w-1/2">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg text-[var(--text-secondary)] mb-6">{feature.description}</p>
                <a href="#pricing" className="text-[var(--primary)] font-medium flex items-center hover:underline transition-all">
                  Learn more
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl opacity-20 blur-lg"></div>
                  <motion.div 
                    whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden aspect-video">
                      {/* This would be replaced with actual feature images */}
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-6xl">{feature.icon}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}