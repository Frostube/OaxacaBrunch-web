import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title = "Oaxaca Brunch — Café de especialidad en Badalona",
  description = "Brunch artesanal y café de especialidad en Badalona. Café de origen, repostería artesanal y platos de temporada en el centro de la ciudad.",
  image = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=630&fit=crop&auto=format",
  url = "",
  type = "website"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Oaxaca Brunch",
    "description": "Brunch artesanal y café de especialidad en Badalona",
    "image": image,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrer de la Mercè, 15",
      "addressLocality": "Badalona",
      "postalCode": "08911",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.4500,
      "longitude": 2.2467
    },
    "telephone": "+34 930 123 456",
    "openingHours": [
      "Mo 08:00-13:30", "Mo 15:30-18:00",
      "Th-Fr 08:00-13:30", "Th-Fr 15:30-18:00",
      "Sa-Su 08:30-18:00"
    ],
    "servesCuisine": "Brunch",
    "priceRange": "€€"
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

export default SEO
