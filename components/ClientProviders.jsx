"use client";
import { ThemeProvider } from './ThemeContext';
import CustomCursorTrail from './CustomCursorTrail';
import ServiceWorkerRegistration from './ServiceWorkerRegistration';
import AmbientSoundEffects from './AmbientSoundEffects';
import { useState, useEffect } from 'react';

export default function ClientProviders({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Prevent hydration mismatch by mounting client components after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <ThemeProvider>
      {isMounted && (
        <>
          <CustomCursorTrail />
          <AmbientSoundEffects />
          <ServiceWorkerRegistration />
        </>
      )}
      {children}
    </ThemeProvider>
  );
}