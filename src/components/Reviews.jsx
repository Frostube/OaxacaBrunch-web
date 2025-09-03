import React from 'react'

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "El mejor brunch de Badalona. Ingredientes frescos y un ambiente increíble.",
      author: "María González"
    },
    {
      id: 2,
      rating: 5,
      text: "Café de especialidad excepcional. El equipo es súper amable y profesional.",
      author: "Carlos Ruiz"
    },
    {
      id: 3,
      rating: 5,
      text: "Perfecto para trabajar o quedar con amigos. Siempre repito la tostada de aguacate.",
      author: "Ana Martín"
    }
  ]

  const renderStars = (rating) => {
    return "★".repeat(rating)
  }

  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <header className="section-header">
          <h2>Lo que dicen nuestros clientes</h2>
        </header>
        
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="stars" aria-label={`${review.rating} de 5 estrellas`}>
                <span>{renderStars(review.rating)}</span>
              </div>
              <blockquote>
                "{review.text}"
              </blockquote>
              <cite>— {review.author}</cite>
            </article>
          ))}
        </div>
        
        <div className="reviews-cta">
          <a href="https://g.page/r/CRqF8vN9J9QHEBA/review" target="_blank" rel="noopener" className="btn btn-secondary">Ver más en Google</a>
        </div>
      </div>
    </section>
  )
}

export default Reviews
