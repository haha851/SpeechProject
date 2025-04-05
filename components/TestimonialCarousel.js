import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const testimonials = [
    {
      quote: "This service was a lifesaver for my daughter's wedding. The speech was heartfelt, personal, and had everyone in tears - the good kind!",
      author: "Michael R.",
      role: "Father of the Bride",
      image: "/images/testimonials/michael.jpg",
      rating: 5
    },
    {
      quote: "You helped me blow everyone away at my brother's wedding. Worth every penny and then some!",
      author: "Jennifer L.",
      role: "Maid of Honor",
      image: "/images/testimonials/jennifer.jpg",
      rating: 5
    },
    {
      quote: "My graduation speech received a standing ovation. I couldn't have done it without your help and guidance.",
      author: "Samantha T.",
      role: "Valedictorian",
      image: "/images/testimonials/samantha.jpg",
      rating: 5
    },
    {
      quote: "Our fundraiser exceeded its goal by 40%. Your speech captured our mission perfectly and moved people to action.",
      author: "David K.",
      role: "Non-profit Director",
      image: "/images/testimonials/david.jpg",
      rating: 4
    }
  ];
  
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  const handleDotClick = (index) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  return (
    <section id="testimonials" className="section bg-[var(--bg-light)]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--accent)] font-medium tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">What Our Clients Say</h2>
          <p className="text-[var(--text-secondary)] text-lg">Don't just take our word for it — here's what clients have to say about their experiences</p>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row md:items-center mb-6 gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {/* Placeholder for testimonial image */}
                    <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white text-3xl font-bold">
                      {testimonials[activeIndex].author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xl font-medium">{testimonials[activeIndex].author}</p>
                    <p className="text-[var(--text-secondary)]">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
                <blockquote className="text-xl md:text-2xl italic leading-relaxed">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === activeIndex ? 'bg-[var(--primary)]' : 'bg-gray-300'
                } hover:bg-[var(--primary-dark)]`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
            <button 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              onClick={() => {
                setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
                setAutoplay(false);
              }}
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
            <button 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              onClick={() => {
                setActiveIndex((current) => (current + 1) % testimonials.length);
                setAutoplay(false);
              }}
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="font-bold text-xl mb-6">Trusted By</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Google */}
            <div className="h-8 opacity-70 hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" className="h-full w-auto fill-gray-600">
                <path d="M48.6,17.8c0,7-5.4,12.1-12,12.1c-6.6,0-12-5.1-12-12.1c0-7,5.4-12.1,12-12.1C43.2,5.7,48.6,10.7,48.6,17.8z M44.8,17.8 c0-4.4-3.2-7.4-8.2-7.4c-5,0-8.2,3-8.2,7.4c0,4.4,3.2,7.4,8.2,7.4C41.6,25.2,44.8,22.2,44.8,17.8z M68.7,17.8c0,7-5.4,12.1-12,12.1 c-6.6,0-12-5.1-12-12.1c0-7,5.4-12.1,12-12.1C63.3,5.7,68.7,10.7,68.7,17.8z M64.9,17.8c0-4.4-3.2-7.4-8.2-7.4c-5,0-8.2,3-8.2,7.4 c0,4.4,3.2,7.4,8.2,7.4C61.7,25.2,64.9,22.2,64.9,17.8z M87.2,6.6v22.5h-4V26c-1.1,1.4-3.2,2.4-5.8,2.4c-5.8,0-10.3-5-10.3-12.1 c0-7.1,4.5-12.1,10.3-12.1c2.7,0,4.7,1,5.8,2.4V6.6H87.2z M83.4,16.3c0-4.3-2.8-7.2-6.8-7.2c-4,0-7,3-7,7.2c0,4.2,3,7.2,7,7.2 C80.6,23.5,83.4,20.6,83.4,16.3z M101.7,6.2c5.5,0,9.3,3.2,9.5,7.8h-3.9c-0.2-2.5-2.4-4.2-5.6-4.2c-3.2,0-5.3,1.6-5.3,3.8 c0,1.8,1.3,2.8,4.2,3.5l3.1,0.7c5.1,1.1,7.3,3.2,7.3,6.9c0,4.6-4.3,7.7-10.1,7.7c-5.8,0-9.8-3.2-10.2-7.9h4 c0.3,2.6,2.5,4.2,6.2,4.2c3.5,0,6-1.4,6-3.8c0-1.8-1.3-2.8-4.2-3.5l-3.4-0.8c-4.7-1.1-7-3.2-7-6.8C92.3,9.2,96.1,6.2,101.7,6.2z"/>
              </svg>
            </div>
            {/* Instagram */}
            <div className="h-8 opacity-70 hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" className="h-full w-auto fill-gray-600">
                <path d="M20,3.9c5.2,0,5.8,0,7.9,0.1c1.9,0.1,2.9,0.4,3.6,0.7c0.9,0.3,1.5,0.8,2.2,1.4c0.7,0.7,1,1.3,1.4,2.2 c0.3,0.7,0.6,1.7,0.7,3.6c0.1,2.1,0.1,2.7,0.1,7.9c0,5.2,0,5.8-0.1,7.9c-0.1,1.9-0.4,2.9-0.7,3.6c-0.3,0.9-0.8,1.5-1.4,2.2 c-0.7,0.7-1.3,1-2.2,1.4c-0.7,0.3-1.7,0.6-3.6,0.7c-2.1,0.1-2.7,0.1-7.9,0.1c-5.2,0-5.8,0-7.9-0.1c-1.9-0.1-2.9-0.4-3.6-0.7 c-0.9-0.3-1.5-0.8-2.2-1.4c-0.7-0.7-1-1.3-1.4-2.2c-0.3-0.7-0.6-1.7-0.7-3.6C4,25.8,4,25.2,4,20c0-5.2,0-5.8,0.1-7.9 c0.1-1.9,0.4-2.9,0.7-3.6c0.3-0.9,0.8-1.5,1.4-2.2c0.7-0.7,1.3-1,2.2-1.4c0.7-0.3,1.7-0.6,3.6-0.7C14.2,3.9,14.8,3.9,20,3.9 M20,0 c-5.3,0-6,0-8.1,0.1C9.8,0.2,8.3,0.5,7,1C5.6,1.5,4.5,2.2,3.4,3.4C2.2,4.5,1.5,5.6,1,7c-0.5,1.3-0.8,2.8-0.9,5 C0,14,0,14.7,0,20s0,6,0.1,8.1c0.1,2.2,0.4,3.7,0.9,5c0.5,1.4,1.2,2.5,2.3,3.6c1.1,1.1,2.2,1.8,3.6,2.3c1.3,0.5,2.8,0.8,5,0.9 C14,40,14.7,40,20,40s6,0,8.1-0.1c2.2-0.1,3.7-0.4,5-0.9c1.4-0.5,2.5-1.2,3.6-2.3c1.1-1.1,1.8-2.2,2.3-3.6c0.5-1.3,0.8-2.8,0.9-5 C40,26,40,25.3,40,20s0-6-0.1-8.1c-0.1-2.2-0.4-3.7-0.9-5c-0.5-1.4-1.2-2.5-2.3-3.6c-1.1-1.1-2.2-1.8-3.6-2.3 c-1.3-0.5-2.8-0.8-5-0.9C26,0,25.3,0,20,0L20,0z M20,9.7c-5.7,0-10.3,4.6-10.3,10.3c0,5.7,4.6,10.3,10.3,10.3 c5.7,0,10.3-4.6,10.3-10.3C30.3,14.4,25.7,9.7,20,9.7z M20,26.7c-3.7,0-6.7-3-6.7-6.7c0-3.7,3-6.7,6.7-6.7s6.7,3,6.7,6.7 C26.7,23.7,23.7,26.7,20,26.7z M30.5,7c-1.3,0-2.4,1.1-2.4,2.4c0,1.3,1.1,2.4,2.4,2.4c1.3,0,2.4-1.1,2.4-2.4 C32.9,8.1,31.8,7,30.5,7z"/>
              </svg>
            </div>
            {/* Facebook */}
            <div className="h-8 opacity-70 hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" className="h-full w-auto fill-gray-600">
                <path d="M36.7,0H3.3C1.5,0,0,1.5,0,3.3v33.4C0,38.5,1.5,40,3.3,40h18V24.5h-4.9v-5.7h4.9v-4.2c0-4.9,3-7.5,7.3-7.5 c2.1,0,3.9,0.2,4.4,0.2v5.1l-3,0c-2.4,0-2.8,1.1-2.8,2.8v3.6h5.7l-0.7,5.7h-4.9V40h9.8c1.8,0,3.3-1.5,3.3-3.3V3.3 C40,1.5,38.5,0,36.7,0z"/>
              </svg>
            </div>
            {/* LinkedIn */}
            <div className="h-8 opacity-70 hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" className="h-full w-auto fill-gray-600">
                <path d="M37.3,0H2.7C1.2,0,0,1.2,0,2.7v34.7C0,38.8,1.2,40,2.7,40h34.7c1.5,0,2.7-1.2,2.7-2.7V2.7C40,1.2,38.8,0,37.3,0z M12.7,32 H7.3V15.3h5.3V32z M10,13c-1.8,0-3.3-1.5-3.3-3.3c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3C13.3,11.5,11.8,13,10,13z M32.7,32 h-5.3v-8.7c0-2.7-0.9-4-3.1-4c-2.3,0-3.5,1.6-3.5,4V32h-5.3V15.3h5.3v2.5c0,0,1.6-3.1,5.5-3.1c3.9,0,6.5,2.4,6.5,7.3V32z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}