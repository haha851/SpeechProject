"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MobileGestures({ children, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 50, debounce = 300 }) {
  const containerRef = useRef(null);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [lastSwipeTime, setLastSwipeTime] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [swipeDistance, setSwipeDistance] = useState({ x: 0, y: 0 });
  
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
    setIsSwipeActive(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isSwipeActive) return;
    
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
    
    // Calculate distance moved
    const distanceX = touchEnd.x - touchStart.x;
    const distanceY = touchEnd.y - touchStart.y;
    
    setSwipeDistance({ x: distanceX, y: distanceY });
    
    // Determine swipe direction based on the largest movement axis
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      setSwipeDirection(distanceX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(distanceY > 0 ? 'down' : 'up');
    }
  };
  
  const handleTouchEnd = () => {
    if (!isSwipeActive) return;
    
    const currentTime = new Date().getTime();
    const timeSinceLastSwipe = currentTime - lastSwipeTime;
    
    // Calculate final distance
    const distanceX = touchEnd.x - touchStart.x;
    const distanceY = touchEnd.y - touchStart.y;
    
    // Only trigger swipe if it passes threshold and debounce
    if (timeSinceLastSwipe > debounce) {
      // Check if the swipe is primarily horizontal or vertical
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        // Horizontal swipe
        if (Math.abs(distanceX) > threshold) {
          if (distanceX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (distanceX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(distanceY) > threshold) {
          if (distanceY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (distanceY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      }
      
      setLastSwipeTime(currentTime);
    }
    
    // Reset values
    setIsSwipeActive(false);
    setSwipeDirection(null);
    setSwipeDistance({ x: 0, y: 0 });
  };
  
  // Add vibration feedback for accessibility
  const triggerHapticFeedback = () => {
    if ('vibrate' in navigator) {
      // Short vibration for feedback
      navigator.vibrate(20);
    }
  };
  
  // Add swipe hint animation on mount for new users
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only show hint for first-time mobile users
    const hasSeenHint = localStorage.getItem('hasSeenSwipeHint');
    const isMobile = window.innerWidth < 768;
    
    if (!hasSeenHint && isMobile) {
      // Display hint and save to localStorage
      localStorage.setItem('hasSeenSwipeHint', 'true');
    }
  }, []);
  
  return (
    <div
      ref={containerRef}
      className="touch-wrapper relative w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
      
      {/* Visual feedback during active swipe */}
      {isSwipeActive && swipeDirection && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
        >
          <div className={`
            swipe-indicator 
            ${swipeDirection === 'left' ? 'left-indicator' : ''} 
            ${swipeDirection === 'right' ? 'right-indicator' : ''}
            ${swipeDirection === 'up' ? 'up-indicator' : ''}
            ${swipeDirection === 'down' ? 'down-indicator' : ''}
          `}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{
                opacity: Math.min(Math.abs(swipeDistance.x) / (threshold * 2), 0.8),
                transform: `scale(${1 + Math.min(Math.abs(swipeDistance.x) / threshold, 0.3)})`
              }}
            >
              {swipeDirection === 'left' && (
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              )}
              {swipeDirection === 'right' && (
                <path d="M5 12h14M12 5l7 7-7 7"/>
              )}
              {swipeDirection === 'up' && (
                <path d="M12 19V5M5 12l7-7 7 7"/>
              )}
              {swipeDirection === 'down' && (
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              )}
            </svg>
          </div>
        </motion.div>
      )}
      
      <style jsx>{`
        .swipe-indicator {
          color: white;
          padding: 20px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .left-indicator {
          position: absolute;
          left: 20px;
        }
        
        .right-indicator {
          position: absolute;
          right: 20px;
        }
        
        .up-indicator {
          position: absolute;
          top: 20px;
        }
        
        .down-indicator {
          position: absolute;
          bottom: 20px;
        }
      `}</style>
    </div>
  );
}

// Swipeable testimonial carousel component using MobileGestures
export function SwipeableCarousel({ items, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };
  
  return (
    <MobileGestures onSwipeLeft={handleNext} onSwipeRight={handlePrev}>
      <div className="carousel relative overflow-hidden w-full">
        <div className="carousel-inner relative flex transition-transform duration-500 ease-out">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="carousel-item w-full shrink-0 px-4"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0,
                x: `${(index - currentIndex) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
        
        {/* Navigation dots */}
        <div className="carousel-dots flex justify-center mt-4 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-white" : "bg-white/30"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button
          className="carousel-prev absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="carousel-next absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </MobileGestures>
  );
}