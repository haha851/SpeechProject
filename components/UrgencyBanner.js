import { useState, useEffect } from 'react';

export default function UrgencyBanner() {
  // In a real implementation, these would come from an API
  const [spotsData, setSpotsData] = useState({
    claimed: 1,
    total: 4,
    remaining: 3
  });
  
  // This would be updated from a backend in a real implementation
  useEffect(() => {
    // Simulate spots being claimed over time
    const timer = setTimeout(() => {
      if (spotsData.remaining > 1) {
        setSpotsData(prev => ({
          ...prev,
          claimed: prev.claimed + 1,
          remaining: prev.remaining - 1
        }));
      }
    }, 180000); // Change every 3 minutes
    
    return () => clearTimeout(timer);
  }, [spotsData]);
  
  return (
    <section className="py-10 bg-yellow-50 border-y border-yellow-100">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between" data-aos="fade-up">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              🔥 Launch Day Deal — 25% Off for the First 5 Clients
            </h2>
            <p className="text-gray-700 max-w-2xl">
              This is a beta release — I'm taking just 5 orders today. Let's tell your story right.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-brand-500 rounded-full animate-pulse opacity-30"></div>
            <a 
              href="#order-form" 
              className="relative btn-primary text-lg"
            >
              ⚡️ Claim This Offer Now
            </a>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-4 gap-3">
          {Array.from({ length: spotsData.total }).map((_, index) => (
            <div
              key={index}
              className={`bg-white p-3 rounded-lg text-center border ${
                index < spotsData.claimed
                  ? 'border-brand-200 bg-brand-50'
                  : 'border-yellow-200'
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">{index + 1}</div>
              <div className="text-xs text-gray-600">
                {index < spotsData.claimed ? 'Spot Claimed' : 'Spot Open'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}