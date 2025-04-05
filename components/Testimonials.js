export default function Testimonials() {
  const testimonials = [
    {
      quote: "I wasn't nervous. I was prepared. This wasn't just a speech — it was my story told perfectly.",
      author: "Michael R.",
      role: "Father of the Bride",
      avatar: "M"
    },
    {
      quote: "You helped me blow everyone away at my brother's wedding. Worth every penny!",
      author: "J.L.",
      role: "Best Man Speech",
      avatar: "J"
    },
    {
      quote: "My graduation speech received a standing ovation. I couldn't have done it without your help.",
      author: "Samantha T.",
      role: "Valedictorian",
      avatar: "S"
    },
    {
      quote: "Our fundraiser exceeded its goal. Your speech captured our mission perfectly.",
      author: "David K.",
      role: "Non-profit Director",
      avatar: "D"
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
            ⭐ What People Are Saying
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Don't just take my word for it. Here's what clients have to say about their experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="card border border-gray-200"
              data-aos="fade-up" 
              data-aos-delay={100 + (index * 50)}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="italic text-gray-700 mb-3">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center" data-aos="fade-up">
          <h3 className="font-bold text-xl mb-4">Trusted By</h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {/* Google */}
            <div className="h-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40" className="h-full w-auto fill-gray-600">
                <path d="M48.6,17.8c0,7-5.4,12.1-12,12.1c-6.6,0-12-5.1-12-12.1c0-7,5.4-12.1,12-12.1C43.2,5.7,48.6,10.7,48.6,17.8z M44.8,17.8 c0-4.4-3.2-7.4-8.2-7.4c-5,0-8.2,3-8.2,7.4c0,4.4,3.2,7.4,8.2,7.4C41.6,25.2,44.8,22.2,44.8,17.8z M68.7,17.8c0,7-5.4,12.1-12,12.1 c-6.6,0-12-5.1-12-12.1c0-7,5.4-12.1,12-12.1C63.3,5.7,68.7,10.7,68.7,17.8z M64.9,17.8c0-4.4-3.2-7.4-8.2-7.4c-5,0-8.2,3-8.2,7.4 c0,4.4,3.2,7.4,8.2,7.4C61.7,25.2,64.9,22.2,64.9,17.8z M87.2,6.6v22.5h-4V26c-1.1,1.4-3.2,2.4-5.8,2.4c-5.8,0-10.3-5-10.3-12.1 c0-7.1,4.5-12.1,10.3-12.1c2.7,0,4.7,1,5.8,2.4V6.6H87.2z M83.4,16.3c0-4.3-2.8-7.2-6.8-7.2c-4,0-7,3-7,7.2c0,4.2,3,7.2,7,7.2 C80.6,23.5,83.4,20.6,83.4,16.3z M101.7,6.2c5.5,0,9.3,3.2,9.5,7.8h-3.9c-0.2-2.5-2.4-4.2-5.6-4.2c-3.2,0-5.3,1.6-5.3,3.8 c0,1.8,1.3,2.8,4.2,3.5l3.1,0.7c5.1,1.1,7.3,3.2,7.3,6.9c0,4.6-4.3,7.7-10.1,7.7c-5.8,0-9.8-3.2-10.2-7.9h4 c0.3,2.6,2.5,4.2,6.2,4.2c3.5,0,6-1.4,6-3.8c0-1.8-1.3-2.8-4.2-3.5l-3.4-0.8c-4.7-1.1-7-3.2-7-6.8C92.3,9.2,96.1,6.2,101.7,6.2z"/>
              </svg>
            </div>
            {/* Instagram */}
            <div className="h-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" className="h-full w-auto fill-gray-600">
                <path d="M20,3.9c5.2,0,5.8,0,7.9,0.1c1.9,0.1,2.9,0.4,3.6,0.7c0.9,0.3,1.5,0.8,2.2,1.4c0.7,0.7,1,1.3,1.4,2.2 c0.3,0.7,0.6,1.7,0.7,3.6c0.1,2.1,0.1,2.7,0.1,7.9c0,5.2,0,5.8-0.1,7.9c-0.1,1.9-0.4,2.9-0.7,3.6c-0.3,0.9-0.8,1.5-1.4,2.2 c-0.7,0.7-1.3,1-2.2,1.4c-0.7,0.3-1.7,0.6-3.6,0.7c-2.1,0.1-2.7,0.1-7.9,0.1c-5.2,0-5.8,0-7.9-0.1c-1.9-0.1-2.9-0.4-3.6-0.7 c-0.9-0.3-1.5-0.8-2.2-1.4c-0.7-0.7-1-1.3-1.4-2.2c-0.3-0.7-0.6-1.7-0.7-3.6C4,25.8,4,25.2,4,20c0-5.2,0-5.8,0.1-7.9 c0.1-1.9,0.4-2.9,0.7-3.6c0.3-0.9,0.8-1.5,1.4-2.2c0.7-0.7,1.3-1,2.2-1.4c0.7-0.3,1.7-0.6,3.6-0.7C14.2,3.9,14.8,3.9,20,3.9 M20,0 c-5.3,0-6,0-8.1,0.1C9.8,0.2,8.3,0.5,7,1C5.6,1.5,4.5,2.2,3.4,3.4C2.2,4.5,1.5,5.6,1,7c-0.5,1.3-0.8,2.8-0.9,5 C0,14,0,14.7,0,20s0,6,0.1,8.1c0.1,2.2,0.4,3.7,0.9,5c0.5,1.4,1.2,2.5,2.3,3.6c1.1,1.1,2.2,1.8,3.6,2.3c1.3,0.5,2.8,0.8,5,0.9 C14,40,14.7,40,20,40s6,0,8.1-0.1c2.2-0.1,3.7-0.4,5-0.9c1.4-0.5,2.5-1.2,3.6-2.3c1.1-1.1,1.8-2.2,2.3-3.6c0.5-1.3,0.8-2.8,0.9-5 C40,26,40,25.3,40,20s0-6-0.1-8.1c-0.1-2.2-0.4-3.7-0.9-5c-0.5-1.4-1.2-2.5-2.3-3.6c-1.1-1.1-2.2-1.8-3.6-2.3 c-1.3-0.5-2.8-0.8-5-0.9C26,0,25.3,0,20,0L20,0z M20,9.7c-5.7,0-10.3,4.6-10.3,10.3c0,5.7,4.6,10.3,10.3,10.3 c5.7,0,10.3-4.6,10.3-10.3C30.3,14.4,25.7,9.7,20,9.7z M20,26.7c-3.7,0-6.7-3-6.7-6.7c0-3.7,3-6.7,6.7-6.7s6.7,3,6.7,6.7 C26.7,23.7,23.7,26.7,20,26.7z M30.5,7c-1.3,0-2.4,1.1-2.4,2.4c0,1.3,1.1,2.4,2.4,2.4c1.3,0,2.4-1.1,2.4-2.4 C32.9,8.1,31.8,7,30.5,7z"/>
              </svg>
            </div>
            {/* Facebook */}
            <div className="h-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" className="h-full w-auto fill-gray-600">
                <path d="M36.7,0H3.3C1.5,0,0,1.5,0,3.3v33.4C0,38.5,1.5,40,3.3,40h18V24.5h-4.9v-5.7h4.9v-4.2c0-4.9,3-7.5,7.3-7.5 c2.1,0,3.9,0.2,4.4,0.2v5.1l-3,0c-2.4,0-2.8,1.1-2.8,2.8v3.6h5.7l-0.7,5.7h-4.9V40h9.8c1.8,0,3.3-1.5,3.3-3.3V3.3 C40,1.5,38.5,0,36.7,0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}