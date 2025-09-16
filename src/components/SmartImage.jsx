import React, { useState, useEffect } from 'react'

const SmartImage = ({ 
  src, 
  fallbackSrc, 
  alt, 
  className = '', 
  width, 
  height, 
  loading = 'lazy',
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Check WebP support
  const supportsWebP = () => {
    if (typeof window === 'undefined') return false
    
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch (e) {
      return false
    }
  }

  useEffect(() => {
    // If the image is WebP and browser doesn't support it, use fallback
    if (src.includes('.webp') && !supportsWebP() && fallbackSrc) {
      setImageSrc(fallbackSrc)
    } else {
      setImageSrc(src)
    }
  }, [src, fallbackSrc])

  const handleError = () => {
    if (!hasError && fallbackSrc && imageSrc !== fallbackSrc) {
      setHasError(true)
      setImageSrc(fallbackSrc)
    } else {
      console.warn(`Failed to load image: ${imageSrc}`)
      
      // Last resort fallback for menu items
      if (imageSrc.includes('/menu/') && !imageSrc.includes('unsplash.com')) {
        const fallbackImages = {
          'Torrada_de_guacamole': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop&auto=format',
          'Crema_de_cacauet': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop&auto=format',
          'tostada_hummus': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop&auto=format',
          'Croissant_de_salmo': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&auto=format',
          'granola_casolana': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop&auto=format'
        }
        
        for (const [name, url] of Object.entries(fallbackImages)) {
          if (imageSrc.includes(name)) {
            setImageSrc(url)
            return
          }
        }
      }
    }
  }

  const handleLoad = () => {
    setHasError(false)
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  )
}

export default SmartImage
