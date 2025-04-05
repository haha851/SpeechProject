"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServiceWorkerRegistration() {
  const [isOffline, setIsOffline] = useState(false);
  const [showOfflineNotification, setShowOfflineNotification] = useState(false);
  const [swRegistration, setSwRegistration] = useState(null);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    // Check if the browser supports service workers
    if ('serviceWorker' in navigator) {
      // Register the service worker
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
          setSwRegistration(registration);
          
          // Check for updates on page load and periodically
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available
                setIsUpdateAvailable(true);
              }
            });
          });
          
          // Set up periodic update checking
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Check for updates every hour
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
      
      // Listen for controller change (service worker activation)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // The new service worker has taken control
        console.log('New service worker is now controlling the page');
      });
      
      // Set up message channel to the service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'OFFLINE_STATUS_RESPONSE') {
          setIsOffline(event.data.status === 'offline');
          if (event.data.status === 'offline') {
            setShowOfflineNotification(true);
            setTimeout(() => setShowOfflineNotification(false), 5000);
          }
        }
      });
    }
    
    // Set up online/offline event listeners
    const handleOnline = () => {
      setIsOffline(false);
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 'online-toast';
      toast.innerText = 'You are back online!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      setShowOfflineNotification(true);
      setTimeout(() => setShowOfflineNotification(false), 5000);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check initial state
    setIsOffline(!navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Function to refresh the page when update is available
  const refreshPage = () => {
    window.location.reload();
  };
  
  return (
    <>
      {/* Offline notification toast */}
      <AnimatePresence>
        {showOfflineNotification && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            You are currently offline. Some features may be limited.
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Update notification */}
      <AnimatePresence>
        {isUpdateAvailable && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span className="mr-3">New version available!</span>
            <button 
              onClick={refreshPage}
              className="bg-white text-indigo-600 px-2 py-1 rounded text-sm hover:bg-indigo-100 transition-colors"
            >
              Refresh
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Subtle offline indicator (visible when offline) */}
      {isOffline && (
        <div className="fixed bottom-4 right-4 w-3 h-3 rounded-full bg-red-500 shadow-lg z-40" />
      )}
      
      {/* Add the necessary styles */}
      <style jsx global>{`
        .online-toast {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          background-color: #10B981;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 50;
          animation: fadeInOut 3s ease-in-out forwards;
        }
        
        @keyframes fadeInOut {
          0% { transform: translateY(1rem); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(1rem); opacity: 0; }
        }
      `}</style>
    </>
  );
}