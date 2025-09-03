import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
      <div className="container">
        <div className="nav-content">
          <a href="index.html" className="logo" aria-label="Oaxaca Brunch - Inicio">
            <svg className="logo-svg" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="bottom-curve" d="M 20 85 Q 100 100 180 85" stroke="none" fill="none"/>
              </defs>
              <ellipse cx="100" cy="60" rx="95" ry="55" fill="#3C2E26"/>
              <text x="100" y="50" fill="#F4F0E8" fontFamily="Nunito, sans-serif" fontWeight="700" fontSize="28" textAnchor="middle" dominantBaseline="middle">OAXACA</text>
              <text fill="#F4F0E8" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="7" opacity="0.8">
                <textPath href="#bottom-curve" startOffset="50%" textAnchor="middle">©OAXACA.BRUNCH / BADALONA / 2025</textPath>
              </text>
            </svg>
          </a>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="404.html">Menú</a>
            <a href="404.html">Historia</a>
            <a href="#gallery">Galería</a>
            <a href="#reviews">Reseñas</a>
            <a href="#visit">Visita</a>
            <a href="https://wa.me/34930123456?text=Hola,%20¿puedo%20reservar%20para...?" className="cta-secondary" target="_blank" rel="noopener">
              Reservar
            </a>
          </div>
          
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            aria-label="Abrir menú de navegación" 
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
