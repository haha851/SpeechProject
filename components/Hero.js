import { useState, useEffect } from 'react';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 59,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) {
          return { ...prev, seconds: newSeconds };
        }
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) {
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) {
          return { hours: newHours, minutes: 59, seconds: 59 };
        }
        
        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => value.toString().padStart(2, '0');

  return (
    <div className="relative bg-gradient-to-br from-white to-pink-50">
      {/* Countdown Timer */}
      <div className="sticky top-0 z-50 w-full bg-yellow-400 text-center py-2 text-sm font-medium">
        ⏳ Launch offer ends in: {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </div>
      
      <div className="container-custom pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              🎤 Need a Powerful, Personalized Speech — <span className="text-brand-500">Fast?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Crafted by a pro writer, tailored to your story. 25% off for launch day — limited spots.
            </p>
            <a 
              href="#order-form" 
              className="btn-primary text-lg mb-4"
            >
              🟢 Start My Speech
            </a>
            <p className="text-sm text-gray-500">
              Already helped 100+ clients deliver unforgettable speeches
            </p>
          </div>
          
          <div 
            className="relative flex justify-center"
            data-aos="fade-up"
          >
            <div className="card max-w-md w-full bg-white border border-pink-100 animate-float">
              <div className="absolute -top-3 right-4 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                25% OFF TODAY
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-4xl mr-3">💬</span>
                  <div>
                    <h3 className="font-bold text-lg">Wedding Toast Example</h3>
                    <p className="text-gray-600 text-sm">3-minute, heartfelt with humor</p>
                  </div>
                </div>
                <blockquote className="italic text-gray-700 border-l-4 border-brand-200 pl-4 py-2 text-sm">
                  "I've known Sarah since college, and from dorm room adventures to standing here today, one thing has always been clear—she has the biggest heart of anyone I know. Even when she 'borrowed' my clothes without asking..."
                </blockquote>
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm text-gray-600">5.0</span>
                  </div>
                  <a 
                    href="#order-form" 
                    className="text-brand-600 font-medium text-sm hover:text-brand-800"
                  >
                    Get yours →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}