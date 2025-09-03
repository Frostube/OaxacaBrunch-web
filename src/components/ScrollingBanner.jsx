import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ScrollingBanner = ({ items }) => {
  const [contentWidth, setContentWidth] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      // Calculate the width of one set of items
      const width = contentRef.current.scrollWidth / 2 // Divide by 2 because we duplicate content
      setContentWidth(width)
    }
  }, [items])

  // Create animation variants
  const scrollVariants = {
    animate: {
      x: -contentWidth,
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  }

  return (
    <div className="hero-banner">
      <div className="banner-container">
        <motion.div
          ref={contentRef}
          className="banner-content"
          variants={scrollVariants}
          animate="animate"
          style={{ width: 'max-content' }}
        >
          {/* First set of items */}
          {items.map((item, index) => (
            <span key={`first-${index}`} className="banner-item">
              {item}
            </span>
          ))}
          {/* Duplicate set for seamless loop */}
          {items.map((item, index) => (
            <span key={`second-${index}`} className="banner-item">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default ScrollingBanner
