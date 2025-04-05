"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InkDrop, InkWriteText, InkLine, InkReveal } from './InkInteraction';
import { RevealOnScroll, StaggerOnScroll } from './ScrollAnimation';

export default function LuxuryTestimonials() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  // Register GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "Arthur crafted a wedding speech that left not a dry eye in the room. His ability to weave personal stories with universal themes is unmatched.",
      author: "Margaret Chen",
      title: "CEO, Luminary Media",
      image: "/images/testimonial-1.jpg.txt" // This would be replaced with actual image paths
    },
    {
      id: 2,
      quote: "My TED Talk needed to be perfect. What Arthur delivered wasn't just perfect—it was transformative, elevating my ideas into a narrative that resonated globally.",
      author: "Dr. James Westfield",
      title: "Neuroscientist & Speaker",
      image: "/images/testimonial-2.jpg.txt"
    },
    {
      id: 3,
      quote: "The commencement address Arthur wrote captured exactly what I wanted to say but couldn't find the words for. The graduates were captivated from start to finish.",
      author: "Rebecca Thornhill",
      title: "University President",
      image: "/images/testimonial-3.jpg.txt"
    }
  ];
  
  // Setup autoplay for testimonial carousel
  useEffect(() => {
    let interval;
    
    if (isAutoplay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 7000); // Change testimonial every 7 seconds
    }
    
    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);
  
  // Handle scroll-triggered animations
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Animate the ink splatter elements when scrolled into view
    const inkSplatters = document.querySelectorAll('.ink-splatter');
    inkSplatters.forEach((splatter, i) => {
      gsap.fromTo(
        splatter,
        { 
          scale: 0,
          opacity: 0,
          rotation: Math.random() * 180 - 90
        },
        { 
          scale: 1,
          opacity: 0.8,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          },
          delay: 0.2 * i
        }
      );
    });
    
    // Create floating animation for the feather elements
    const feathers = document.querySelectorAll('.feather-element');
    feathers.forEach((feather) => {
      gsap.to(feather, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    // Animate the testimonial container
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);
  
  // Setup scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  // Handle manual navigation
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoplay(false); // Disable autoplay when manually navigating
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoplay(false); // Disable autoplay when manually navigating
  };
  
  return (
    <section
      ref={sectionRef}
      id="luxury-testimonials"
      className="relative py-24 overflow-hidden bg-slate-50 dark:bg-gray-900"
    >
      {/* Ink splatter decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="ink-splatter absolute top-[10%] left-[5%] w-24 h-24 md:w-32 md:h-32">
          <svg viewBox="0 0 200 200" className="w-full h-full opacity-10 dark:opacity-15">
            <path
              d="M39.9,-65.7C52.3,-56.7,63.5,-46.8,69.9,-34.2C76.4,-21.6,78,-6.4,75.7,8C73.5,22.4,67.3,35.9,57.9,47C48.6,58.1,36,66.7,22.3,70.2C8.5,73.8,-6.5,72.3,-21.2,68.5C-35.9,64.7,-50.5,58.7,-61.2,48C-71.9,37.2,-78.8,22,-79.5,6.5C-80.3,-9,-74.9,-24.9,-65.6,-37.4C-56.3,-49.9,-43.1,-59.1,-29.7,-67.6C-16.4,-76.1,-2.8,-84,7.5,-96.2C12.5,-93.1,17.5,-90,20.1,-81.1C22.7,-72.3,22.7,-57.8,30.9,-47.8C39.1,-37.8,60.7,-32.4,71.1,-22.2C81.6,-12,80.9,3,74.7,14.8C68.4,26.5,56.6,34.9,46.2,44.4C35.7,53.9,26.6,64.5,14.8,68.8C2.9,73.1,-11.7,71.2,-24.6,66.8C-37.4,62.5,-48.5,55.8,-59.3,47.1C-70.1,38.3,-80.4,27.6,-82.4,14.9C-84.3,2.3,-77.9,-12.3,-72.8,-27.5C-67.8,-42.7,-64,-58.4,-54.1,-68.8C-44.1,-79.1,-28,-84.1,-13.4,-81.9C1.3,-79.7,14.5,-70.3,27.9,-68.6C41.3,-66.9,54.8,-73,65.2,-70.6C75.7,-68.2,83.2,-57.4,90.9,-45.8C98.6,-34.3,106.6,-22,107.1,-9.3C107.6,3.5,100.6,16.6,94,29.8C87.4,43,81.1,56.2,70.4,63.6C59.6,71,44.3,72.4,30.5,68.5C16.6,64.5,4.1,55.2,-10.5,55.4C-25.1,55.6,-41.7,65.3,-52.3,62.2C-62.9,59.1,-67.4,43.2,-73.5,28.5C-79.6,13.8,-87.3,0.3,-87.9,-14C-88.5,-28.2,-82.1,-43.3,-71.2,-53.8C-60.3,-64.2,-44.9,-69.9,-30.9,-71.9C-16.9,-73.9,-4.2,-72.1,8.9,-69.6"
              transform="translate(100 100)"
              fill="currentColor"
              className="text-black dark:text-white"
            />
          </svg>
        </div>
        
        <div className="ink-splatter absolute top-[80%] right-[10%] w-32 h-32 md:w-40 md:h-40">
          <svg viewBox="0 0 200 200" className="w-full h-full opacity-10 dark:opacity-15">
            <path
              d="M52.1,-75.5C67.9,-67.6,81.8,-54.9,89.2,-39.2C96.7,-23.5,97.8,-4.7,94.7,13.8C91.6,32.4,84.2,50.7,70.8,62C57.3,73.2,37.8,77.4,19.9,80.4C2,83.4,-14.4,85.2,-28.9,79.7C-43.5,74.3,-56.1,61.6,-65.9,47.2C-75.6,32.9,-82.4,16.4,-83.4,-0.6C-84.4,-17.5,-79.5,-35.1,-69.5,-49.1C-59.5,-63.1,-44.4,-73.7,-28.9,-81.4C-13.5,-89.1,2.3,-94,18.4,-91.1C34.5,-88.2,36,-61.5,42.5,-59.2C48.9,-56.8,38.8,-36.8,36.4,-26.9C34,-17,32.2,-8.5,30.4,0.2C28.6,9,26.9,17.9,23.2,25.7C19.4,33.4,13.7,39.9,5.8,44.8C-2.1,49.6,-12.2,52.7,-22.5,52.4C-32.8,52,-43.2,48.2,-51.8,41.3C-60.3,34.4,-67,24.3,-70.5,13C-74.1,1.7,-74.5,-10.8,-72.4,-23.9C-70.2,-37,-65.6,-50.7,-56.3,-60.3C-47.1,-69.9,-33.3,-75.4,-19.1,-74.6C-4.9,-73.9,9.7,-67,24.8,-60.9"
              transform="translate(100 100)"
              fill="currentColor"
              className="text-black dark:text-white"
            />
          </svg>
        </div>
        
        <div className="ink-splatter absolute top-[40%] left-[85%] w-20 h-20 md:w-28 md:h-28">
          <svg viewBox="0 0 200 200" className="w-full h-full opacity-10 dark:opacity-15">
            <path
              d="M48.9,-75.9C62.4,-67.6,71.9,-53.1,78.8,-37.8C85.7,-22.5,90,-6.4,87.8,8.7C85.6,23.8,76.8,37.8,65.4,49.6C54,61.4,39.9,71,24.3,76.3C8.6,81.7,-8.6,82.9,-23.8,77.9C-39,72.9,-52.2,61.8,-60.2,48.3C-68.3,34.8,-71.2,19,-73.7,2.9C-76.3,-13.2,-78.5,-29.7,-72.2,-42.1C-65.9,-54.5,-51.2,-62.8,-36.8,-70.5C-22.5,-78.2,-8.5,-85.2,4.7,-92.9C18,-100.6,30.2,-108.8,44,-95.8C57.8,-82.8,73.1,-48.6,80.7,-32.2C88.4,-15.8,88.2,2.8,79.5,15.9C70.9,29,53.7,36.5,39.7,43.3"
              transform="translate(100 100)"
              fill="currentColor"
              className="text-black dark:text-white"
            />
          </svg>
        </div>
      </div>
      
      {/* Floating feather elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="feather-element absolute"
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 20)}%`,
              opacity: 0.1
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-black dark:text-white">
              <path d="M20,1 C20,1 19,4 16,8 C13,12 6,16 3,23 C3,23 10,19 15,15 C20,11 22,4 20,1 Z" />
            </svg>
          </div>
        ))}
      </div>
      
      {/* Luxury Testimonials Container */}
      <div 
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-16">
          <RevealOnScroll direction="up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 relative inline-block">
              Words That Resonate
              
              {/* Underline ink effect */}
              <InkLine 
                direction="horizontal" 
                length="medium" 
                thickness="thin" 
                color="black" 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-2"
              />
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
              The artistry of our speeches, reflected in the experiences of those we've served.
            </p>
          </RevealOnScroll>
        </div>
        
        {/* Testimonial Carousel */}
        <div 
          ref={carouselRef}
          className="max-w-5xl mx-auto relative"
        >
          {/* Quote mark decorative element */}
          <div className="absolute -top-16 -left-4 md:-left-10 text-8xl md:text-9xl font-serif text-gray-200 dark:text-gray-800 opacity-60 z-0 pointer-events-none">
            "
          </div>
          
          {/* Testimonials Slider */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 p-8 md:p-12 lg:p-16 rounded-lg shadow-xl">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                index === activeIndex && (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                    className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                  >
                    {/* Testimonial Image with Ink Reveal */}
                    <InkReveal 
                      direction="center-out" 
                      delay={0.3} 
                      color="black"
                      className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden relative"
                    >
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-full">
                        {/* This would be an actual image in production */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                    </InkReveal>
                    
                    {/* Testimonial Content */}
                    <div className="flex-1">
                      <blockquote>
                        <p className="text-lg md:text-xl lg:text-2xl font-serif italic text-gray-800 dark:text-gray-200 mb-6">
                          "{testimonial.quote}"
                        </p>
                        
                        <footer className="flex items-center mt-6">
                          <InkLine 
                            direction="horizontal" 
                            length="small" 
                            thickness="thin" 
                            color="black" 
                            className="mr-4"
                          />
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">
                              {testimonial.author}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {testimonial.title}
                            </div>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoplay(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-black dark:bg-white scale-125'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-md z-10 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Bottom ink splatter */}
          <div className="absolute -bottom-16 right-0 w-32 h-32 opacity-20 dark:opacity-10 transform rotate-45">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M54.6,-46.3C63.9,-34.8,60.9,-12.6,56.5,8.5C52.1,29.5,46.3,49.5,32.2,62.2C18,74.9,-4.5,80.2,-20.9,71.7C-37.3,63.1,-47.7,40.8,-56.6,17.6C-65.4,-5.5,-72.9,-29.6,-64.1,-41.3C-55.3,-53,-30.2,-52.2,-7.6,-47.5C15,-42.8,35.9,-34.3,54.6,-46.3Z"
                transform="translate(100 100)"
                fill="currentColor"
                className="text-black dark:text-white"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}