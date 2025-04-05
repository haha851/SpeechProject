"use client";
import { useEffect, useRef, useState } from 'react';

export default function AmbientSoundEffects() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastTriggerPosition, setLastTriggerPosition] = useState(0);
  const [volume, setVolume] = useState(0.2);
  
  // Audio references
  const scrollSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const backgroundSoundRef = useRef(null);
  
  // Audio context for advanced sound processing
  const audioContextRef = useRef(null);
  
  // Initialize audio
  useEffect(() => {
    // Only initialize audio after user interaction (browser policy)
    const handleUserInteraction = () => {
      if (audioContextRef.current) return;
      
      try {
        // Set up audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
        
        // Create audio elements
        scrollSoundRef.current = new Audio('/audio/subtle-scroll.mp3');
        scrollSoundRef.current.volume = 0.1;
        
        clickSoundRef.current = new Audio('/audio/subtle-click.mp3');
        clickSoundRef.current.volume = 0.15;
        
        hoverSoundRef.current = new Audio('/audio/subtle-hover.mp3');
        hoverSoundRef.current.volume = 0.05;
        
        backgroundSoundRef.current = new Audio('/audio/ambient-background.mp3');
        backgroundSoundRef.current.loop = true;
        backgroundSoundRef.current.volume = 0;
        
        // Set up audio processing if needed
        const setupAdvancedAudio = () => {
          if (!backgroundSoundRef.current) return;
          
          // Create source nodes
          const source = audioContextRef.current.createMediaElementSource(backgroundSoundRef.current);
          
          // Create effects chain
          const gainNode = audioContextRef.current.createGain();
          gainNode.gain.value = 0;
          
          // Create filter for better sound
          const filter = audioContextRef.current.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 800;
          
          // Connect nodes
          source.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContextRef.current.destination);
          
          // Fade in capability
          const fadeIn = () => {
            if (gainNode.gain.value < volume) {
              gainNode.gain.value += 0.001;
              requestAnimationFrame(fadeIn);
            }
          };
          
          // Start background sound with fade in
          backgroundSoundRef.current.play().then(() => {
            setIsPlaying(true);
            fadeIn();
          }).catch(err => {
            console.log("Audio failed to play: ", err);
          });
        };
        
        // Call setup after a short delay to ensure context is fully established
        setTimeout(setupAdvancedAudio, 500);
        
        setIsEnabled(true);
      } catch (error) {
        console.error("Error initializing audio:", error);
      }
      
      // Remove event listeners once initialized
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
    
    // Wait for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      
      // Cleanup audio
      if (backgroundSoundRef.current) {
        backgroundSoundRef.current.pause();
        backgroundSoundRef.current = null;
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [volume]);
  
  // Handle scroll sound effects
  useEffect(() => {
    if (!isEnabled) return;
    
    const MIN_SCROLL_TRIGGER = 100; // Minimum pixels scrolled to trigger sound
    let lastScrollY = window.scrollY;
    let scrollTimeout = null;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      setScrollPosition(currentScrollY);
      
      // Only play sound when scrolling a significant amount and not too frequently
      if (scrollDelta > MIN_SCROLL_TRIGGER && 
          Math.abs(currentScrollY - lastTriggerPosition) > MIN_SCROLL_TRIGGER * 3) {
        playScrollSound(scrollDelta);
        setLastTriggerPosition(currentScrollY);
      }
      
      lastScrollY = currentScrollY;
      
      // Clear previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set a new timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        // Optional: play a different sound when scrolling stops
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isEnabled, lastTriggerPosition]);
  
  // Play scroll sound with pitch variation based on scroll speed
  const playScrollSound = (scrollDelta) => {
    if (!scrollSoundRef.current || !isEnabled) return;
    
    try {
      // Clone the audio to allow multiple overlapping sounds
      const sound = scrollSoundRef.current.cloneNode();
      
      // Vary the pitch based on scroll speed
      const speedFactor = Math.min(Math.max(scrollDelta / 400, 0.8), 1.2);
      sound.playbackRate = speedFactor;
      
      // Adjust volume based on scroll speed
      sound.volume = Math.min(0.1 * (scrollDelta / 300), 0.15);
      
      // Play the sound
      sound.play().catch(e => console.warn("Could not play scroll sound:", e));
      
      // Auto cleanup
      sound.onended = () => {
        sound.remove();
      };
    } catch (error) {
      console.warn("Error playing scroll sound:", error);
    }
  };
  
  // Add click sounds to interactive elements
  useEffect(() => {
    if (!isEnabled || !clickSoundRef.current) return;
    
    const playClickSound = (e) => {
      // Don't play for elements that shouldn't have sound
      if (e.target.classList.contains('no-sound')) return;
      
      // Only play for interactive elements
      const isInteractive = e.target.tagName === 'BUTTON' || 
                            e.target.tagName === 'A' ||
                            e.target.closest('button') || 
                            e.target.closest('a') ||
                            e.target.getAttribute('role') === 'button';
      
      if (!isInteractive) return;
      
      try {
        // Clone to allow multiple sounds
        const sound = clickSoundRef.current.cloneNode();
        sound.volume = 0.15;
        
        // Randomize pitch slightly for natural feel
        sound.playbackRate = 0.95 + Math.random() * 0.1;
        
        sound.play().catch(e => console.warn("Could not play click sound:", e));
        
        // Auto cleanup
        sound.onended = () => {
          sound.remove();
        };
      } catch (error) {
        console.warn("Error playing click sound:", error);
      }
    };
    
    document.addEventListener('click', playClickSound);
    
    return () => {
      document.removeEventListener('click', playClickSound);
    };
  }, [isEnabled]);
  
  // Mute/unmute functionality
  const toggleMute = () => {
    if (!backgroundSoundRef.current) return;
    
    if (isPlaying) {
      backgroundSoundRef.current.volume = 0;
      setIsPlaying(false);
    } else {
      backgroundSoundRef.current.volume = volume;
      setIsPlaying(true);
    }
  };
  
  // No visible UI, just functionality
  return null;
}