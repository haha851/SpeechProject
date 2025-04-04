import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

// Import components
import Hero from '../components/Hero';
import ValueProp from '../components/ValueProp';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import UrgencyBanner from '../components/UrgencyBanner';
import OrderForm from '../components/OrderForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Speech Writer | Professional Custom Speeches</title>
        <meta name="description" content="Craft powerful, personalized speeches with professional help. Perfect for weddings, business, graduations, and more. Delivered in 24-48 hours." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="AI Speech Writer | Professional Custom Speeches" />
        <meta property="og:description" content="Craft powerful, personalized speeches with professional help. Perfect for weddings, business, graduations, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com" />
        <meta property="og:image" content="https://your-domain.com/og-image.jpg" />
      </Head>

      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Value Proposition Section */}
        <ValueProp />
        
        {/* Pricing Section */}
        <Pricing />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Urgency Banner */}
        <UrgencyBanner />
        
        {/* Order Form Section */}
        <OrderForm />
        
        {/* Floating CTA for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 p-4 bg-white shadow-lg border-t border-gray-200">
          <a 
            href="#order-form" 
            className="btn-primary w-full text-center"
          >
            🔥 Start My Speech - 25% Off Today
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Google Analytics */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-NHPOV7DMK4" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NHPOV7DMK4');
        `}
      </Script>
    </>
  );
}
