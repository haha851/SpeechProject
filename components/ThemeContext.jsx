"use client";
import { createContext, useContext, useEffect, useState } from 'react';

// Create context with default values
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  isDarkMode: true,
});

// Theme provider component to wrap the application
export function ThemeProvider({ children }) {
  // Initialize with 'dark' theme as default
  const [theme, setTheme] = useState('dark');
  const isDarkMode = theme === 'dark';
  
  // Check for user's preferred theme on mount
  useEffect(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      return;
    }
    
    // Otherwise check for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't explicitly chosen a theme
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Update CSS variables when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-primary', '#10002b');
      document.documentElement.style.setProperty('--bg-secondary', '#240046');
      document.documentElement.style.setProperty('--text-primary', '#f8f9fa');
      document.documentElement.style.setProperty('--text-secondary', '#ced4da');
      document.documentElement.style.setProperty('--accent-primary', '#9f86c0');
      document.documentElement.style.setProperty('--accent-secondary', '#be95c4');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#f8f9fa');
      document.documentElement.style.setProperty('--bg-secondary', '#e9ecef');
      document.documentElement.style.setProperty('--text-primary', '#212529');
      document.documentElement.style.setProperty('--text-secondary', '#495057');
      document.documentElement.style.setProperty('--accent-primary', '#7b2cbf');
      document.documentElement.style.setProperty('--accent-secondary', '#9d4edd');
    }
  }, [theme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme() {
  return useContext(ThemeContext);
}