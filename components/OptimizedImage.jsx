"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 80,
  loading = "lazy",
  sizes = "100vw",
  style = {},
  objectFit = "cover",
  placeholderColor = "rgba(0,0,0,0.05)"
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef(null);
  
  useEffect(() => {
    // Set up intersection observer to detect when image is in viewport
    if (!imageRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start loading before image is in view
        threshold: 0.01
      }
    );
    
    observer.observe(imageRef.current);
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  // Generate a tiny blurred version of the image for placeholders
  const generateBlurDataURL = () => {
    return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='${placeholderColor.replace('#', '%23')}' /%3E%3C/svg%3E`;
  };
  
  // Combine className with conditional states
  const imageClassName = `transition-opacity duration-500 ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`;
  
  return (
    <div 
      ref={imageRef}
      className="relative overflow-hidden"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: placeholderColor,
        ...style
      }}
    >
      {/* Animated placeholder */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isLoaded ? 0 : 1,
          scale: isLoaded ? 1.1 : 1
        }}
        transition={{ duration: 0.5 }}
        style={{ 
          background: placeholderColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Next.js Image with blur-up effect */}
      {(isInView || priority) && (
        <Image
          src={src}
          alt={alt}
          width={typeof width === 'number' ? width : undefined}
          height={typeof height === 'number' ? height : undefined}
          className={imageClassName}
          quality={quality}
          loading={priority ? 'eager' : loading}
          priority={priority}
          sizes={sizes}
          onLoad={handleImageLoad}
          placeholder="blur"
          blurDataURL={generateBlurDataURL()}
          style={{
            objectFit,
            width: '100%',
            height: '100%'
          }}
        />
      )}
      
      {/* Loading effect overlay */}
      {!isLoaded && isInView && (
        <motion.div
          className="absolute inset-0 bg-transparent flex items-center justify-center"
          initial={{ opacity: 0.7 }}
          animate={{ 
            opacity: [0.7, 0.5, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
        </motion.div>
      )}
    </div>
  );
}