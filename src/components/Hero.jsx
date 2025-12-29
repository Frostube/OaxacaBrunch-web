import React from 'react'
import { motion } from 'framer-motion'
import SimpleBanner from './SimpleBanner'
import { useLanguage, getCopy } from '../language.jsx'

const Hero = () => {
  const { lang } = useLanguage()
  const heroCopy = getCopy(lang).hero
  const bannerText = heroCopy.banner

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="hero-title">{heroCopy.title}</h1>
          <p className="hero-subtitle">
            {heroCopy.subtitle.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx === 0 && <br />}
              </React.Fragment>
            ))}
          </p>
          <div className="hero-cta">
            <a href="#menu" className="btn-hero">{heroCopy.cta}</a>
          </div>
        </motion.div>

        {/* Video Player */}
        <motion.div 
          className="hero-video-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <div className="video-player">
            <video 
              poster="/assets/images/hero.webp" 
              preload="none"
              playsInline
              webkit-playsinline="true"
              muted
              controls={false}
              data-ready="false"
              onError={(e) => {
                console.warn('Video failed to load');
                // Try JPG poster as fallback for iOS Safari
                if (e.target.poster.includes('.webp')) {
                  e.target.poster = '/assets/images/hero.jpg';
                }
              }}
              onLoadedData={() => {
                const video = document.querySelector('.video-player video');
                if (video) video.setAttribute('data-ready', 'true');
              }}
            >
              {/* Add your video file here when available */}
              <source src="assets/videos/hero-video.mp4" type="video/mp4" />
              <source src="assets/videos/hero-video.webm" type="video/webm" />
              {/* Fallback for when no video is available */}
              Tu navegador no soporta el elemento de video.
            </video>
            <div className="play-button-container">
              <div className="spinning-text">
                <svg className="spinning-circle" viewBox="0 0 200 200">
                  <defs>
                    <path id="circle-path" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none"/>
                  </defs>
                  <text className="spinning-text-content">
                    <textPath href="#circle-path" startOffset="0%">
                      REPRODUCIR • VER VIDEO • REPRODUCIR • VER VIDEO • 
                    </textPath>
                  </text>
                </svg>
              </div>
              <button className="play-button" aria-label="Reproducir video">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Simple Perfect Banner */}
      <div className="hero-banner">
        <SimpleBanner 
          text={bannerText}
          speed={1}
        />
      </div>
    </section>
  )
}

export default Hero
