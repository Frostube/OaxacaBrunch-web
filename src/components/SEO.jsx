import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLanguage, getCopy } from '../language.jsx'

const SEO = ({ 
  title,
  description,
  image = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=630&fit=crop&auto=format",
  url = "",
  type = "website"
}) => {
  const { lang } = useLanguage()
  const seoCopy = getCopy(lang).seo
  const metaTitle = title || seoCopy.title
  const metaDescription = description || seoCopy.description

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Oaxaca Brunch",
    "description": metaDescription,
    "inLanguage": lang,
    "image": image,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrer de Arnús, 31",
      "addressLocality": "Badalona",
      "postalCode": "08911",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.4497,
      "longitude": 2.2479
    },
    "telephone": "+34 930 123 456",
    "openingHours": [
      "Mo 08:00-13:30", "Mo 15:30-18:00",
      "Th-Fr 08:00-13:30", "Th-Fr 15:30-18:00",
      "Sa-Su 08:30-18:00"
    ],
    "servesCuisine": seoCopy.servesCuisine,
    "priceRange": "€€"
  }

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

export default SEO
