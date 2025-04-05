"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function TestimonialsSection() {
  const ref = useRef(null);
  const carouselRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  
  // Enhanced testimonials with more details
  const testimonials = [
    {
      quote: "People laughed, cried, clapped — you nailed it. I couldn't have asked for a better best man speech. The words captured exactly what I wanted to say but couldn't find the right expression for.",
      author: "James Layton",
      location: "Toronto",
      profession: "Marketing Director",
      rating: 5,
      image: "/images/testimonial-1.jpg"
    },
    {
      quote: "I actually felt confident. You brought my voice to life in a way I never could have. The graduation speech was a huge hit, and I received countless compliments on how authentic and inspiring it was.",
      author: "Diana Simmons",
      location: "New York City",
      profession: "Recent Graduate",
      rating: 5,
      image: "/images/testimonial-2.jpg"
    },
    {
      quote: "The fundraising event was a success largely due to your speech. We exceeded our goal by 40%! Your ability to capture the emotional connection to our cause while maintaining professionalism was exactly what we needed.",
      author: "Michael Kang",
      location: "San Francisco",
      profession: "Non-profit Director",
      rating: 5,
      image: "/images/testimonial-3.jpg"
    },
    {
      quote: "My TEDx talk would not have been the same without your guidance. The speech struck the perfect balance between informative and inspiring. Several attendees reached out afterward specifically about the delivery.",
      author: "Sarah Johnson",
      location: "Seattle",
      profession: "Tech Innovator",
      rating: 5,
      image: "/images/testimonial-2.jpg"
    },
    {
      quote: "As someone who dreaded public speaking, you transformed what would have been a forgettable wedding toast into a memorable moment. My brother and his wife were moved to tears — in a good way!",
      author: "Thomas Chen",
      location: "Chicago",
      profession: "Architect",
      rating: 5,
      image: "/images/testimonial-1.jpg"
    }
  ];
  
  // Autoplay functionality
  useEffect(() => {
    let interval;
    
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000); // Change slide every 6 seconds
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  // Animation effects
  useEffect(() => {
    if (isInView && carouselRef.current) {
      gsap.registerPlugin();
      gsap.from(".testimonial-card", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, [isInView]);
  
  // Handle navigation
  const goToSlide = (index) => {
    setActiveIndex(index);
    setAutoplay(false); // Pause autoplay when manually navigating
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };
  
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };
  
  // Touch events for swipe on mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
  };

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-24 relative overflow-hidden"
      style={{ minHeight: '600px' }}
    >
      {/* Enhanced background elements with layered effect */}
      <div className="absolute inset-0 bg-indigo-900/10 backdrop-blur-[2px]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-900/0 to-indigo-800/20" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-indigo-900/0 to-indigo-800/20" />
      
      {/* Added subtle noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text-animated gradient-text-purple"
              style={{ letterSpacing: "0.01em", lineHeight: "1.2" }}>
            Client Success Stories
          </h2>
          <p className="text-lg text-indigo-100/90 max-w-2xl mx-auto"
             style={{ letterSpacing: "0.01em", lineHeight: "1.6" }}>
            Real results from real people who delivered unforgettable speeches.
          </p>
        </motion.div>
        
        {/* Carousel container with touch events */}
        <div
          ref={carouselRef}
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Testimonial carousel */}
          <div className="overflow-hidden rounded-xl relative shadow-layered glass">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                className="testimonial-card"
              >
                <div className="p-8 md:p-10">
                  {/* Premium card design with glass morphism */}
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Testimonial image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-layered micro-border flex-shrink-0">
                      <motion.img
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].author}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    {/* Testimonial content */}
                    <div className="flex-1">
                      {/* Star rating with animated shine effect */}
                      <div className="flex mb-4">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <motion.svg
                            key={i}
                            className="w-5 h-5 text-yellow-400 mr-1"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              filter: [
                                "drop-shadow(0 0 2px rgba(250, 204, 21, 0.4))",
                                "drop-shadow(0 0 6px rgba(250, 204, 21, 0.7))",
                                "drop-shadow(0 0 2px rgba(250, 204, 21, 0.4))"
                              ]
                            }}
                            transition={{
                              duration: 0.3,
                              delay: i * 0.1,
                              filter: {
                                repeat: 2,
                                duration: 2,
                                ease: "easeInOut"
                              }
                            }}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                      
                      {/* Testimonial quote with animated entry */}
                      <motion.blockquote
                        className="text-indigo-100 text-lg italic mb-6 relative pl-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        style={{ borderLeft: "2px solid rgba(139, 92, 246, 0.5)", letterSpacing: "0.01em", lineHeight: "1.6" }}
                      >
                        "{testimonials[activeIndex].quote}"
                      </motion.blockquote>
                      
                      {/* Author info with staggered animation */}
                      <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <h4 className="font-medium text-lg">{testimonials[activeIndex].author}</h4>
                        <div className="text-indigo-300 text-sm flex items-center gap-2">
                          <span>{testimonials[activeIndex].profession}</span>
                          <span className="inline-block w-1 h-1 rounded-full bg-indigo-400/60"></span>
                          <span>{testimonials[activeIndex].location}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons with hover effects */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-between w-full px-4 pointer-events-none">
              <motion.button
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white pointer-events-auto shadow-layered"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white pointer-events-auto shadow-layered"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          {/* Slide indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-indigo-500 w-8' : 'bg-indigo-500/30'}`}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}