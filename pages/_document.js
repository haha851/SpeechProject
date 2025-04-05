import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0071e3" />
        <link rel="canonical" href="https://arthuriverson.xyz" />
        
        {/* System font stack that includes SF Pro Display */}
        <style>{`
          @font-face {
            font-family: 'SF Pro Display';
            src: local('SF Pro Display'),
                 local('SFProDisplay-Regular'),
                 local('.SFNSDisplay-Regular'),
                 local('.SFNS-Regular');
            font-weight: normal;
            font-style: normal;
          }
        `}</style>
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Arthur Iverson AI Speech Writer",
              "description": "Professional custom speech writing service powered by AI",
              "provider": {
                "@type": "Person",
                "name": "Arthur Iverson"
              },
              "offers": {
                "@type": "Offer",
                "price": "49.00",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "104"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}