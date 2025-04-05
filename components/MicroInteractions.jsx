"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollPercentage(Math.min(scrolled, 100));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.div
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="w-1 h-40 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-500 to-indigo-500 rounded-full"
          style={{ height: `${scrollPercentage}%` }}
          initial={{ height: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />
      </div>
      <div className="text-xs mt-2 text-center opacity-60">
        {Math.round(scrollPercentage)}%
      </div>
    </motion.div>
  );
}

export function SocialProofNotification() {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  
  const names = [
    "Sarah J.", "Michael R.", "Emma T.", "David L.", "Sophia K.",
    "Daniel M.", "Olivia P.", "James B.", "Ava C.", "William S."
  ];
  
  const messages = [
    "just purchased a speech",
    "loved their custom speech",
    "received amazing feedback",
    "saved 4 hours of writing time",
    "completed their first draft"
  ];
  
  useEffect(() => {
    // Only show after user has been on the page for a while
    const initialDelay = setTimeout(() => {
      showRandomNotification();
    }, 10000);
    
    return () => {
      clearTimeout(initialDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  const showRandomNotification = () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setNotifications([{
      id: Date.now(),
      name: randomName,
      message: randomMessage,
      time: Math.floor(Math.random() * 10) + 1 // 1-10 minutes ago
    }]);
    
    setVisible(true);
    
    // Hide after 5 seconds
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      
      // Schedule the next notification
      timeoutRef.current = setTimeout(() => {
        showRandomNotification();
      }, Math.random() * 30000 + 30000); // Random time between 30-60 seconds
    }, 5000);
  };
  
  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-lg max-w-xs"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <span className="text-xs font-bold">{notification.name.charAt(0)}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.name} {notification.message}</p>
              <p className="text-xs opacity-70">{notification.time} minute{notification.time !== 1 ? 's' : ''} ago</p>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export function FormFeedback({ inputId, feedbackType }) {
  // Add subtle feedback animations to form inputs
  useEffect(() => {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const handleFocus = () => {
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.style.transform = 'translateY(-20px) scale(0.85)';
        label.style.color = 'var(--accent-primary)';
      }
    };
    
    const handleBlur = () => {
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL' && !input.value) {
        label.style.transform = 'translateY(0) scale(1)';
        label.style.color = 'var(--text-secondary)';
      }
    };
    
    const handleInput = (e) => {
      if (feedbackType === 'typing') {
        const container = input.parentElement;
        const feedback = container.querySelector('.feedback-typing');
        
        if (feedback) {
          feedback.style.width = `${Math.min((e.target.value.length / 20) * 100, 100)}%`;
        }
      }
    };
    
    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);
    input.addEventListener('input', handleInput);
    
    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
      input.removeEventListener('input', handleInput);
    };
  }, [inputId, feedbackType]);
  
  return null; // This component just adds the event listeners
}

export function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const popupShownRef = useRef(false);
  
  useEffect(() => {
    // Only track exit intent after user has been on page for a while
    const timer = setTimeout(() => {
      const handleMouseLeave = (e) => {
        // Exit intent detected when mouse leaves through the top of the page
        if (
          e.clientY <= 0 && 
          !popupShownRef.current && 
          !localStorage.getItem('exitPopupShown')
        ) {
          setShowPopup(true);
          popupShownRef.current = true;
          
          // Don't show again for this session
          localStorage.setItem('exitPopupShown', 'true');
        }
      };
      
      document.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, 10000); // Wait 10 seconds before tracking exit intent
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setShowPopup(false);
  };
  
  if (!showPopup) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gradient-to-b from-indigo-900/90 to-purple-900/90 p-8 rounded-xl max-w-md mx-4 relative border border-white/20 shadow-2xl"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <button 
          className="absolute top-2 right-2 text-white/60 hover:text-white"
          onClick={handleClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 className="text-2xl font-bold gradient-text-animated gradient-text-purple mb-4">Wait! Special Offer</h3>
        <p className="mb-4">Sign up now and get 15% off your first speech order. Limited time only!</p>
        
        <div className="mb-4">
          <input
            type="email"
            id="exit-popup-email"
            placeholder="Your email address"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <motion.button 
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-medium"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClose}
        >
          Get My Discount
        </motion.button>
        
        <p className="text-xs mt-4 text-center opacity-60">
          No spam, just great speech writing tips and offers.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default {
  ScrollIndicator,
  SocialProofNotification,
  FormFeedback,
  ExitIntentPopup
}