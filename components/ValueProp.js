export default function ValueProp() {
  const benefits = [
    {
      icon: "✍️",
      title: "Custom Speech",
      description: "Tailored to your voice, style & occasion"
    },
    {
      icon: "⏱️",
      title: "Fast Delivery",
      description: "Ready within 24-48 hours"
    },
    {
      icon: "💬",
      title: "Personal Input",
      description: "Optional 1-on-1 call for guidance"
    },
    {
      icon: "🔄",
      title: "Free Revisions",
      description: "Up to 2 rounds included"
    },
    {
      icon: "🔒",
      title: "100% Confidential",
      description: "Your story stays private"
    },
    {
      icon: "👨‍💻",
      title: "Human-Written",
      description: "By a professional, not AI"
    }
  ];

  return (
    <section id="benefits" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
            ✅ Professional. Fast. Personalized.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Whether it's a wedding toast, motivational talk, or corporate presentation — 
            deliver with confidence and impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="card hover:border-brand-200 hover:-translate-y-1"
              data-aos="fade-up" 
              data-aos-delay={100 + (index * 50)}
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="font-bold text-xl mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div 
          className="max-w-3xl mx-auto bg-brand-50 rounded-2xl p-6 border border-brand-100" 
          data-aos="fade-up"
        >
          <div className="flex items-start space-x-4">
            <div className="text-4xl">💡</div>
            <blockquote>
              <p className="text-lg italic mb-4">
                "I help real people deliver unforgettable speeches — even if writing isn't your thing. 
                Your story deserves to be told in your voice, with the right words."
              </p>
              <footer>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-300 mr-3 flex items-center justify-center text-white font-bold">
                    AR
                  </div>
                  <div>
                    <p className="font-medium">Arthur Iverson</p>
                    <p className="text-sm text-gray-600">Professional Speech Writer</p>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}