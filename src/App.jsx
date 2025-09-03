import React from 'react'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuTeaser from './components/MenuTeaser'
import Story from './components/Story'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Visit from './components/Visit'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <SEO />
      
      {/* Skip to content for accessibility */}
      <a href="#main" className="skip-link">Saltar al contenido principal</a>
      
      <Navbar />
      
      <main id="main">
        <Hero />
        <MenuTeaser />
        <Story />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
