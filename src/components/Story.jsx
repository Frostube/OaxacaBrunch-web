import React from 'react'

const Story = () => {
  return (
    <section className="story">
      <div className="container">
        <div className="story-content">
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop&auto=format" 
                 alt="Barista preparando café de especialidad en Oaxaca Brunch" 
                 width="400" height="300" loading="lazy" className="enhanced-hover" />
          </div>
          <div className="story-text">
            <h2>Nuestra historia</h2>
            <p>Café de origen, repostería artesanal y platos de temporada en el centro de Badalona. Cada mañana seleccionamos los mejores ingredientes para crear experiencias únicas que conecten a nuestra comunidad.</p>
            <a href="404.html" className="link">Conoce más sobre nosotros</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story
