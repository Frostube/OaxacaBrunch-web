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
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
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
