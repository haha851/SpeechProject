import './globals.css'
import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '../utils/analytics'
import ClientProviders from '../components/ClientProviders'
import { metadata } from './metadata'
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2,900,901,902,903,904,905,906,907,700,701,702,703,704,705,706,707,500,501,502,503,504,505,506,507,400,401,402,403,404,405,406,407,300,301,302,303,304,305,306,307&display=swap" rel="stylesheet" />
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        
        {/* GSAP for advanced animations */}
        <Script
          strategy="afterInteractive"
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        />
        <Script
          strategy="afterInteractive"
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        />
        
        {/* Custom Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}