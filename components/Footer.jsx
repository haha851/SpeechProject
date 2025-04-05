"use client";
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 relative overflow-hidden">
      {/* Premium visual divider with animation */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(165, 180, 252, 0.5), rgba(139, 92, 246, 0.3), transparent)"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />
      
      {/* Background decoration elements */}
      <div className="absolute -top-80 -right-80 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-80 -left-80 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass micro-border p-4 rounded-xl">
              <motion.a
                href="#"
                className="block mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center">
                  <svg
                    className="w-10 h-auto mr-3"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Fountain Pen with pulse effect */}
                    <motion.circle
                      cx="30" cy="30" r="22"
                      fill="white" fillOpacity="0.1"
                      stroke="white"
                      strokeWidth="2"
                      animate={{
                        r: [22, 23, 22],
                        fillOpacity: [0.1, 0.15, 0.1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Fountain Pen */}
                    <motion.path
                      d="M40 15L25 30l-5 15l15-5l15-15L40 15z"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      animate={{
                        strokeDashoffset: [0, 50, 0],
                      }}
                      style={{
                        strokeDasharray: 100,
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Pen nib */}
                    <path d="M25 30l-2 6l6-2l-4-4z" stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.3"/>
                    {/* Cap/detail */}
                    <path d="M42 13l5 5l-4 4l-5-5l4-4z" stroke="white" strokeWidth="1.5" fill="white" fillOpacity="0.2"/>
                  </svg>
                  <div>
                    <motion.div
                      className="text-lg font-bold leading-tight tracking-wider gradient-text-animated gradient-text-purple"
                      animate={{
                        textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 3px rgba(255,255,255,0.3)', '0 0 0px rgba(255,255,255,0)']
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      THE SPEECH WRITER
                    </motion.div>
                    <div className="text-xs opacity-80">BY ARTHUR IVERSON</div>
                  </div>
                </div>
              </motion.a>
              
              <p className="text-indigo-100/80 text-sm mb-6 max-w-xs"
                 style={{ letterSpacing: "0.01em", lineHeight: "1.6" }}>
                Expert speech writing services that make you sound as amazing as you truly are. Unforgettable words for unforgettable moments.
              </p>
              
              <div className="flex items-center gap-3">
                <motion.a
                  href="#"
                  className="w-9 h-9 rounded-full glass micro-border shadow-layered flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)"
                  }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400
                  }}
                >
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </motion.svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-9 h-9 rounded-full glass micro-border shadow-layered flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)"
                  }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400,
                    delay: 0.05
                  }}
                >
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </motion.svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="w-9 h-9 rounded-full glass micro-border shadow-layered flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)"
                  }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 400,
                    delay: 0.1
                  }}
                >
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </motion.svg>
                </motion.a>
              </div>
            </div>
            
            <div className="glass micro-border p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-5 gradient-text-animated gradient-text-purple">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Features", href: "#features" },
                  { name: "How It Works", href: "#process" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "FAQ", href: "#faq" }
                ].map((link, index) => (
                  <li key={index}>
                    <motion.a 
                      href={link.href} 
                      className="text-indigo-100/80 hover:text-white transition-all text-sm flex items-center"
                      style={{ letterSpacing: "0.01em" }}
                      whileHover={{ x: 5, color: "rgba(255, 255, 255, 1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span 
                        className="inline-block mr-2 opacity-0 w-0"
                        animate={{ opacity: 0, width: "0px" }}
                        whileHover={{ opacity: 1, width: "12px" }}
                        transition={{ duration: 0.2 }}
                      >→</motion.span>
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="glass micro-border p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-5 gradient-text-animated gradient-text-purple">Contact</h3>
              <motion.p className="text-indigo-100/80 text-sm mb-2"
                 style={{ letterSpacing: "0.01em", lineHeight: "1.6" }}>
                <motion.a 
                  href="mailto:hi@arthuriverson.xyz" 
                  className="hover:text-white transition-colors relative inline-block"
                  whileHover={{ scale: 1.02 }}
                >
                  hi@arthuriverson.xyz
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.p>
              <p className="text-indigo-100/80 text-sm mb-6"
                 style={{ letterSpacing: "0.01em", lineHeight: "1.6" }}>
                Available Monday-Friday, 9am-5pm EST
              </p>
              
              <h4 className="text-sm font-medium mb-3 gradient-text">Payment Methods</h4>
              <div className="flex gap-3 flex-wrap">
                {/* Visa */}
                <motion.div className="w-12 h-8 glass micro-border rounded flex items-center justify-center"
                   whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <svg className="w-10 h-6" viewBox="0 0 48 16" fill="none">
                    <path fill="#FFFFFF" d="M19.13 1.5l-4.26 10h-2.86l-2.1-8.12c-.13-.5-.24-.68-.63-.89-.64-.35-1.7-.67-2.62-.88l.06-.61h4.52c.58 0 1.1.38 1.23 1.04l1.12 5.92 2.76-6.96h2.8zm8.02 6.76c.01-2.65-3.66-2.8-3.64-3.98 0-.36.35-.74 1.1-.84.37-.05 1.4-.08 2.56.44l.46-2.12c-.62-.23-1.43-.45-2.42-.45-2.57 0-4.37 1.36-4.38 3.31-.02 1.44 1.29 2.25 2.27 2.73 1.01.49 1.35.81 1.35 1.25-.01.68-.81.98-1.56.99-1.31.02-2.07-.35-2.67-.63l-.48 2.2c.61.28 1.72.52 2.88.53 2.72 0 4.5-1.34 4.51-3.43zm6.8 3.24h2.48l-2.16-10h-2.3c-.52 0-.96.3-1.15.76l-4.03 9.24h2.81l.56-1.55h3.45l.34 1.55zm-3.03-3.63l1.42-3.91.81 3.91h-2.23zm-11.35-6.37l-2.24 10h-2.68l2.24-10h2.68z"/>
                  </svg>
                </motion.div>
                
                {/* MasterCard */}
                <motion.div className="w-12 h-8 glass micro-border rounded flex items-center justify-center"
                   whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <svg className="w-10 h-6" viewBox="0 0 40 24" fill="none">
                    <circle cx="14" cy="12" r="8" fill="#EB001B"/>
                    <circle cx="26" cy="12" r="8" fill="#F79E1B"/>
                    <path d="M20 6.4c-1.8 1.5-3 3.4-3 5.6s1.2 4.1 3 5.6c1.8-1.5 3-3.4 3-5.6s-1.2-4.1-3-5.6z" fill="#FF5F00"/>
                    <path d="M20 6.4c-1.8 1.5-3 3.4-3 5.6s1.2 4.1 3 5.6c1.8-1.5 3-3.4 3-5.6s-1.2-4.1-3-5.6z" fill="#fff" fillOpacity="0.2"/>
                  </svg>
                </motion.div>
                
                {/* American Express */}
                <motion.div className="w-12 h-8 glass micro-border rounded flex items-center justify-center"
                   whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <svg className="w-10 h-6" viewBox="0 0 40 24" fill="none">
                    <rect x="4" y="5" width="32" height="14" rx="1" fill="#006FCF"/>
                    <path d="M7 12.5h3.5M22 12.5h3.5M7 8.5h4l1.5 3.5L14 8.5h4M16 16h8M10 16H7l-2-7.5h4l1.5 5" stroke="white" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
                    <path d="M25 8.5l-4 7.5h8l4-7.5h-8z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
                  </svg>
                </motion.div>
                
                {/* PayPal */}
                <motion.div className="w-12 h-8 glass micro-border rounded flex items-center justify-center"
                   whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <svg className="w-10 h-6" viewBox="0 0 40 24" fill="none">
                    <path d="M28.5 7.3c0 2.4-1.1 4.3-3.3 5.6-1.7 1-3.8 1.5-6.2 1.5h-1.2c-0.5 0-0.9 0.4-1 0.9l-0.8 5.1c-0.1 0.4-0.4 0.7-0.8 0.7h-2.9c-0.4 0-0.6-0.3-0.6-0.7l0.1-0.3 1.7-10.7 0.1-0.4c0.1-0.4 0.4-0.7 0.9-0.7h5.7c2.3 0 4.1 0.5 5.3 1.4 0.9 0.7 1.5 1.7 1.8 2.8 0.1-0.1 0.1-0.1 0.2-0.2z" fill="#FFFFFF"/>
                    <path d="M30.2 7c0 0.6-0.1 1.2-0.2 1.9-0.8 4.1-3.5 5.5-7 5.5h-1.8c-0.5 0-0.9 0.4-1 0.9l-1.1 6.9c-0.1 0.3-0.3 0.6-0.7 0.6h-3c-0.4 0-0.6-0.3-0.5-0.6l0.9-5.9c0.1-0.5 0.5-0.9 1-0.9h1.8c3.5 0 6.2-1.4 7-5.5 0.3-1.5 0.2-2.7-0.4-3.5" fill="#FFFFFF" fillOpacity="0.6"/>
                  </svg>
                </motion.div>
                
                {/* CheckYa */}
                <motion.div className="w-12 h-8 glass micro-border rounded flex items-center justify-center"
                   whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <svg className="w-10 h-6" viewBox="0 0 40 24" fill="none">
                    <rect x="4" y="5" width="32" height="14" rx="2" fill="#34C759" fillOpacity="0.8"/>
                    <path d="M10 13l3 3 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 13h7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M23 9h7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
                
                {/* TON Payments */}
                <motion.div className="w-12 h-8 glass micro-border rounded flex items-center justify-center"
                   whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <svg className="w-10 h-6" viewBox="0 0 40 24" fill="none">
                    <path d="M20 5c-5.5 0-10 3.58-10 8s4.5 8 10 8 10-3.58 10-8-4.5-8-10-8z" fill="#0088CC" stroke="white" strokeWidth="1"/>
                    <path d="M16 11l8-3-5 9-3-6zm0 0l3 3" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                
                {/* Crypto Payments */}
                <motion.div className="w-12 h-8 glass micro-border rounded flex items-center justify-center"
                   whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <svg className="w-10 h-6" viewBox="0 0 40 24" fill="none">
                    <circle cx="20" cy="12" r="7" fill="#F7931A" stroke="white" strokeWidth="0.5"/>
                    <path d="M23 10.5c-.28-1.12-1.37-1.5-2.5-1.62V7h-1v1.86h-1V7h-1v1.86H15v1h1.05c.5 0 .65.18.65.47v3.34c0 .35-.24.47-.5.47H15v1h2.5V17h1v-1.86h1V17h1v-1.86c1.78-.1 3-1 2.5-2.64-.36-1.26-1.25-1.42-2-1.5.75-.38 1.23-.92 1-2zm-1.75 3.38c0 1.25-2.25 1.12-3 1.12v-2.25c.75 0 3 -.38 3 1.13zm-.5-3c0 1.12-1.75 1-2.5 1V9.75c.75 0 2.5-.25 2.5 1.13z" fill="white"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="mt-12 pt-6 border-t border-indigo-800/30 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="text-sm text-indigo-100/50 mb-4 md:mb-0">
              © {currentYear} Arthur Iverson. All rights reserved.
            </div>
            
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-sm text-indigo-100/50 hover:text-white transition-colors"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 8px rgba(255,255,255,0.5)"
                }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="text-sm text-indigo-100/50 hover:text-white transition-colors"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 8px rgba(255,255,255,0.5)"
                }}
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}