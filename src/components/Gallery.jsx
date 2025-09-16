import React, { useState, useEffect, useRef } from 'react'
import SmartImage from './SmartImage'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const Gallery = () => {
  // Configuration constants (best practice from reference)
  const DRAG_BUFFER = 0
  const VELOCITY_THRESHOLD = 500
  const GAP = 16
  const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 }
  const CONTAINER_PADDING = 16

  // Gallery items data - Oaxaca Brunch authentic content
  const galleryItems = [
    {
      id: 1,
      title: "Café de Especialidad",
      description: "Latte art perfecto con granos de origen único de Oaxaca",
      image: "/assets/images/gallery/Iced_latte.jpg",
      alt: "Café iced latte art con diseño de hoja sobre mesa de madera"
    },
    {
      id: 2,
      title: "Brunch Artesanal",
      description: "Mesa completa con ingredientes frescos y presentación cuidada",
      image: "/assets/images/gallery/brunch_table.jpg",
      alt: "Mesa de brunch completo con flores frescas y luz natural"
    },
    {
      id: 3,
      title: "Ambiente Acogedor",
      description: "Interior cálido con plantas naturales y decoración auténtica",
      image: "/assets/images/gallery/Ambiente_Acogedor.jpg",
      alt: "Interior acogedor de cafetería con plantas y decoración vintage"
    },
    {
      id: 4,
      title: "Experiencia Social",
      description: "Momentos únicos compartidos en un ambiente familiar",
      image: "/assets/images/gallery/Eperiencia_Social.jpg",
      alt: "Grupo de amigos disfrutando del brunch en ambiente relajado"
    }
  ]

  // State management
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(368)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageSrc, setLightboxImageSrc] = useState('')
  const [lightboxImageAlt, setLightboxImageAlt] = useState('')
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  // Motion values for smooth animations (best practice from reference)
  const x = useMotionValue(0)
  
  // Refs
  const carouselContainerRef = useRef(null)
  const carouselTrackRef = useRef(null)
  const carouselItemsRef = useRef([])

  const trackItemOffset = itemWidth + GAP

  // Calculate responsive sizes (enhanced from reference)
  const calculateSizes = () => {
    if (!carouselContainerRef.current) return

    const containerWidth = carouselContainerRef.current.offsetWidth - (CONTAINER_PADDING * 2)

    let newItemWidth
    if (window.innerWidth >= 1024) {
      newItemWidth = 568
    } else if (window.innerWidth >= 768) {
      newItemWidth = 468
    } else {
      newItemWidth = Math.min(containerWidth, 340)
    }

    setItemWidth(newItemWidth)
  }

  // Calculate the proper translateX value including mobile centering
  const getTranslateX = (index = currentIndex) => {
    let translateX = -(index * trackItemOffset)
    
    // On mobile, add centering offset for proper alignment
    if (window.innerWidth < 768 && carouselContainerRef.current) {
      const containerWidth = carouselContainerRef.current.offsetWidth - (CONTAINER_PADDING * 2)
      const centerOffset = (containerWidth - itemWidth) / 2
      translateX += Math.max(0, centerOffset)
    }
    
    return translateX
  }

  // Navigation functions with improved logic
  const goToSlide = (index) => {
    const newIndex = Math.max(0, Math.min(galleryItems.length - 1, index))
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const nextIndex = currentIndex >= galleryItems.length - 1 ? 0 : currentIndex + 1
    goToSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = currentIndex <= 0 ? galleryItems.length - 1 : currentIndex - 1
    goToSlide(prevIndex)
  }

  // Enhanced drag handling (best practice from reference)
  const handleDragEnd = (_, info) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      nextSlide()
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      prevSlide()
    }
  }

  // Drag constraints for better UX (from reference)
  const getDragConstraints = () => {
    const baseConstraints = {
      left: getTranslateX(galleryItems.length - 1),
      right: getTranslateX(0)
    }
    return baseConstraints
  }

  // Lightbox functions (keeping our existing functionality)
  const openLightbox = (src, alt, index) => {
    setLightboxImageSrc(src)
    setLightboxImageAlt(alt)
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const showNextLightboxImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryItems.length
    const nextItem = galleryItems[nextIndex]
    setCurrentImageIndex(nextIndex)
    setLightboxImageSrc(nextItem.image)
    setLightboxImageAlt(nextItem.alt)
  }

  const showPrevLightboxImage = () => {
    const prevIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length
    const prevItem = galleryItems[prevIndex]
    setCurrentImageIndex(prevIndex)
    setLightboxImageSrc(prevItem.image)
    setLightboxImageAlt(prevItem.alt)
  }

  // Effects
  useEffect(() => {
    calculateSizes()
    const handleResize = () => {
      calculateSizes()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        switch (e.key) {
          case 'Escape':
            closeLightbox()
            break
          case 'ArrowRight':
            showNextLightboxImage()
            break
          case 'ArrowLeft':
            showPrevLightboxImage()
            break
        }
      } else {
        switch (e.key) {
          case 'ArrowRight':
            if (e.target.closest('.carousel-container')) {
              e.preventDefault()
              nextSlide()
            }
            break
          case 'ArrowLeft':
            if (e.target.closest('.carousel-container')) {
              e.preventDefault()
              prevSlide()
            }
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, currentImageIndex, currentIndex])

  return (
    <>
      <section className="gallery" id="gallery">
        <div className="gallery-container">
          <div className="gallery-header">
            <h2>Sabor, Color y Tradición — Los Placeres de Oaxaca Brunch</h2>
          </div>

          <div 
            className="carousel-container" 
            id="gallery-carousel" 
            ref={carouselContainerRef}
            style={{
              perspective: 1000,
              perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`
            }}
          >
            <motion.div 
              className="carousel-track" 
              id="carousel-track" 
              ref={carouselTrackRef}
              drag="x"
              dragConstraints={getDragConstraints()}
              style={{
                x,
                gap: `${GAP}px`,
                width: itemWidth
              }}
              onDragEnd={handleDragEnd}
              animate={{ x: getTranslateX() }}
              transition={SPRING_OPTIONS}
            >
              {galleryItems.map((item, index) => {
                // Simplified transforms for better Safari performance
                const range = [
                  getTranslateX(index + 1), 
                  getTranslateX(index), 
                  getTranslateX(index - 1)
                ]
                // Reduced 3D effects for Safari compatibility
                const rotateYRange = [8, 0, -8]
                const scaleRange = [0.9, 1, 0.9]
                const opacityRange = [0.6, 1, 0.6]
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const rotateY = useTransform(x, range, rotateYRange, { clamp: true })
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(x, range, scaleRange, { clamp: true })
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(x, range, opacityRange, { clamp: true })

                return (
                  <motion.div
                    key={item.id}
                    className="carousel-item"
                    ref={el => carouselItemsRef.current[index] = el}
                    style={{
                      width: `${itemWidth}px`,
                      rotateY,
                      scale,
                      opacity,
                      zIndex: Math.max(1, 10 - Math.abs(index - currentIndex))
                    }}
                    data-title={item.title}
                    data-description={item.description}
                  >
                    <div className="carousel-item-header"></div>
                    <SmartImage
                      src={item.image}
                      fallbackSrc={item.image.replace('.webp', '.jpg')}
                      alt={item.alt}
                      width="400"
                      height="400"
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation()
                        openLightbox(item.image, item.alt, index)
                      }}
                    />
                    <div className="carousel-item-content">
                      <div className="carousel-item-title">{item.title}</div>
                      <p className="carousel-item-description">{item.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            <div className="carousel-indicators-container">
              <div className="carousel-indicators" id="carousel-indicators">
                {galleryItems.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`carousel-indicator ${index === currentIndex ? 'active' : 'inactive'}`}
                    animate={{
                      scale: index === currentIndex ? 1.2 : 1
                    }}
                    onClick={() => goToSlide(index)}
                    transition={{ duration: 0.15 }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="gallery-footer">
            <p>— desde Nuestra Cocina</p>
            <p className="gallery-description">
              Cada plato que servimos cuenta una historia - de especias exóticas, cenas familiares, 
              y centurias de tradición culinaria. En Oaxaca Café, cocinamos la forma en que fuimos 
              enseñados; con paciencia y orgullo. No es solo comida - es un recuerdo en cada bocado.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <motion.div 
          className="lightbox" 
          id="lightbox" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="lightbox-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex' }}
        >
          <div 
            className="lightbox-backdrop" 
            aria-hidden="true"
            onClick={closeLightbox}
          ></div>
          <motion.div 
            className="lightbox-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              className="lightbox-close" 
              aria-label="Cerrar galería"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <SmartImage 
              src={lightboxImageSrc} 
              fallbackSrc={lightboxImageSrc.replace('.webp', '.jpg')}
              alt={lightboxImageAlt} 
              id="lightbox-img" 
            />
            <div className="lightbox-nav">
              <button 
                className="lightbox-prev" 
                aria-label="Imagen anterior"
                onClick={showPrevLightboxImage}
              >
                &#8249;
              </button>
              <button 
                className="lightbox-next" 
                aria-label="Imagen siguiente"
                onClick={showNextLightboxImage}
              >
                &#8250;
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Gallery