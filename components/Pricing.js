import { useState } from 'react';

export default function Pricing() {
  const [rushDelivery, setRushDelivery] = useState(false);
  
  const packages = [
    {
      id: 'quicktoast',
      title: 'QuickToast',
      icon: '🍻',
      description: 'Wedding, Best Man, Retirement',
      time: '~3 min',
      originalPrice: 135,
      launchPrice: 99,
      popular: false,
    },
    {
      id: 'impacttalk',
      title: 'ImpactTalk',
      icon: '✨',
      description: 'TEDx, Graduation, Motivational',
      time: '5-7 min',
      originalPrice: 199,
      launchPrice: 149,
      popular: true,
    },
    {
      id: 'executivevoice',
      title: 'Executive Voice',
      icon: '👔',
      description: 'CEO, Corporate, Fundraising',
      time: '7-10 min',
      originalPrice: 275,
      launchPrice: 199,
      popular: false,
    },
    {
      id: 'custom',
      title: 'Custom',
      icon: '🌟',
      description: 'Complex, Multi-speaker, etc.',
      time: 'Any',
      originalPrice: 'Quote',
      launchPrice: 'From $250',
      popular: false,
    }
  ];
  
  const addOns = [
    { id: 'rush', title: 'Rush Delivery (24h)', price: 25 },
    { id: 'coaching', title: 'Live Coaching Session', price: 30 },
    { id: 'revision', title: 'Extra Revision Round', price: 20 },
    { id: 'voiceover', title: 'Voiceover Demo', price: 15 },
  ];

  return (
    <section id="pricing" className="section bg-gradient-to-br from-accent-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
            💼 Speech Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Choose the right package for your needs. All include consultation, 
            personalized writing, and revisions.
          </p>
          
          <div className="inline-flex items-center mt-6 bg-white p-1 rounded-full border shadow-sm" data-aos="fade-up">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-full ${!rushDelivery ? 'bg-brand-500 text-white' : 'text-gray-700'}`}
              onClick={() => setRushDelivery(false)}
            >
              Standard (48h)
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-full ${rushDelivery ? 'bg-brand-500 text-white' : 'text-gray-700'}`}
              onClick={() => setRushDelivery(true)}
            >
              Rush (24h +$25)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.id} 
              className={`card relative ${pkg.popular ? 'border-2 border-accent-400' : 'border border-gray-200'}`}
              data-aos="fade-up" 
              data-aos-delay={100 + (index * 50)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="text-3xl mb-3">{pkg.icon}</div>
              <h3 className="font-bold text-xl mb-1">{pkg.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
              <div className="bg-gray-50 py-1 px-2 rounded-lg text-sm mb-4 inline-block">
                {pkg.time} speech
              </div>
              
              <div className="mb-4">
                <span className="text-gray-400 line-through text-sm">${typeof pkg.originalPrice === 'number' ? pkg.originalPrice : pkg.originalPrice}</span>
                <span className="text-2xl font-bold ml-2 text-gray-900">
                  {typeof pkg.launchPrice === 'number' 
                    ? `$${rushDelivery ? pkg.launchPrice + 25 : pkg.launchPrice}` 
                    : pkg.launchPrice}
                </span>
              </div>
              
              <a
                href="#order-form"
                className={`block text-center py-2 px-4 rounded-lg font-medium ${
                  pkg.popular
                    ? 'bg-accent-500 text-white hover:bg-accent-600'
                    : 'bg-gray-800 text-white hover:bg-gray-900'
                } transition duration-200`}
                onClick={() => {
                  // In a real implementation, this would store the selected package
                  // and update the order form
                  console.log(`Selected package: ${pkg.title}`);
                  document.getElementById('speechType').value = pkg.id;
                  if (pkg.id === 'quicktoast') {
                    document.getElementById('length').value = 'short';
                  } else if (pkg.id === 'impacttalk') {
                    document.getElementById('length').value = 'medium';
                  } else if (pkg.id === 'executivevoice') {
                    document.getElementById('length').value = 'long';
                  } else {
                    document.getElementById('length').value = 'custom';
                  }
                }}
              >
                Select Package
              </a>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md" data-aos="fade-up">
          <h3 className="font-bold text-xl mb-4">🎁 Optional Add-ons</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((addon) => (
              <div key={addon.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <input 
                  type="checkbox" 
                  id={addon.id}
                  className="h-5 w-5 text-accent-500 rounded focus:ring-accent-400"
                  disabled={addon.id === 'rush' && rushDelivery}
                  defaultChecked={addon.id === 'rush' && rushDelivery}
                  readOnly
                />
                <label htmlFor={addon.id} className="flex-1">
                  <span className="block font-medium">{addon.title}</span>
                  <span className="text-sm text-gray-600">+${addon.price}</span>
                </label>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-center space-x-4 text-gray-500 text-sm">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Secure payment
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}