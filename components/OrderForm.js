import { useState } from 'react';

export default function OrderForm() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    speechType: '',
    length: '',
    deadline: '',
    tone: [],
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToneChange = (tone) => {
    setFormData(prev => {
      const currentTones = [...prev.tone];
      if (currentTones.includes(tone)) {
        return { ...prev, tone: currentTones.filter(t => t !== tone) };
      } else {
        return { ...prev, tone: [...currentTones, tone] };
      }
    });
  };

  const nextStep = () => {
    setFormStep(prev => prev + 1);
  };

  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const submitForm = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.speechType ||
        !formData.length || !formData.deadline) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real implementation, this would submit to a backend API
    // and redirect to a payment processor
    console.log('Form submitted with data:', formData);
    
    // Show success message
    alert('Thank you for your order! We will contact you shortly to confirm the details.');
    
    // Reset form or redirect
    // window.location.href = '/thank-you'; // For a real implementation
  };

  return (
    <section id="order-form" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
            📝 Start Your Custom Speech
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Fill out the form below and I'll craft a powerful, personalized speech that 
            captures your voice and message.
          </p>
        </div>

        <div className="max-w-2xl mx-auto" data-aos="fade-up">
          <div className="card border border-gray-200">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map(step => (
                  <div 
                    key={step}
                    className={`flex items-center ${step < formStep ? 'text-green-500' : step === formStep ? 'text-brand-500' : 'text-gray-400'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      step < formStep 
                        ? 'bg-green-100' 
                        : step === formStep 
                          ? 'bg-brand-100' 
                          : 'bg-gray-100'
                    }`}>
                      {step < formStep ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span>{step}</span>
                      )}
                    </div>
                    <span className="text-sm font-medium hidden md:inline">
                      {step === 1 ? 'Details' : step === 2 ? 'Customize' : 'Review'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-brand-500 rounded-full transition-all duration-300"
                  style={{ width: `${((formStep - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            <form onSubmit={submitForm}>
              {/* Step 1: Basic Details */}
              <div className={`form-step ${formStep === 1 ? 'active' : 'inactive'}`}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="speechType" className="block text-sm font-medium text-gray-700 mb-1">
                      Speech Type
                    </label>
                    <select
                      id="speechType"
                      name="speechType"
                      value={formData.speechType}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                      required
                    >
                      <option value="">Select a speech type</option>
                      <option value="wedding">Wedding Toast</option>
                      <option value="bestman">Best Man Speech</option>
                      <option value="maidofhonor">Maid of Honor Speech</option>
                      <option value="graduation">Graduation Speech</option>
                      <option value="business">Business Presentation</option>
                      <option value="retirement">Retirement Speech</option>
                      <option value="funeral">Funeral Eulogy</option>
                      <option value="other">Other (specify in message)</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Step 2: Customization */}
              <div className={`form-step ${formStep === 2 ? 'active' : 'inactive'}`}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Length
                    </label>
                    <select
                      id="length"
                      name="length"
                      value={formData.length}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                      required
                    >
                      <option value="">Select length</option>
                      <option value="short">Short (~3 minutes)</option>
                      <option value="medium">Medium (5-7 minutes)</option>
                      <option value="long">Long (7-10 minutes)</option>
                      <option value="custom">Custom (specify in message)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                      When Do You Need It?
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Tone (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Formal', 'Funny', 'Heartfelt', 'Inspirational', 'Professional', 'Casual', 'Serious', 'Uplifting'].map(tone => (
                        <div key={tone} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`tone-${tone}`}
                            checked={formData.tone.includes(tone)}
                            onChange={() => handleToneChange(tone)}
                            className="h-4 w-4 text-brand-500 focus:ring-brand-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`tone-${tone}`} className="ml-2 text-sm text-gray-700">
                            {tone}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Step 3: Final Details & Submit */}
              <div className={`form-step ${formStep === 3 ? 'active' : 'inactive'}`}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Details or Instructions
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                      placeholder="Tell me about the occasion, audience, key points you'd like to include, or anything else that would help me write your perfect speech."
                    ></textarea>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><span className="font-medium">Speech Type:</span> {formData.speechType || 'Not selected'}</p>
                      <p><span className="font-medium">Length:</span> {formData.length || 'Not selected'}</p>
                      <p><span className="font-medium">Tone:</span> {formData.tone.join(', ') || 'Not specified'}</p>
                      <p><span className="font-medium">Deadline:</span> {formData.deadline || 'Not selected'}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>$149.00</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">25% launch discount applied</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Complete Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}