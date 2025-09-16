import React, { useState, useEffect } from 'react'
import SmartImage from './SmartImage'

const MenuTeaser = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  // Fix stagger animation - ensure it's visible
  useEffect(() => {
    const el = document.querySelector('.stagger-animation')
    if (el) {
      el.classList.add('animate')
    }
  }, [])

  const menuItems = [
    {
      id: 1,
      name: 'Torrada de guacamole',
      description: 'Con burrata y pesto',
      price: '15€',
      image: '/assets/images/menu/Torrada_de_guacamole.webp',
      tags: ['vegetarian']
    },
    {
      id: 2,
      name: 'Crema de cacahuete',
      description: 'Plátano y arándanos sobre pan de masa madre',
      price: '10€',
      image: '/assets/images/menu/Crema_de_cacauet.webp',
      tags: ['vegetarian']
    },
    {
      id: 3,
      name: 'Tostada de hummus',
      description: 'Tomate seco y rúcula',
      price: '13€',
      image: '/assets/images/menu/tostada_hummus.webp',
      tags: ['vegetarian']
    },
    {
      id: 4,
      name: 'Croissant de salmón',
      description: 'Con aguacate y queso crema',
      price: '14€',
      image: '/assets/images/menu/Croissant_de_salmo.webp',
      tags: []
    },
    {
      id: 5,
      name: 'Bowl de quinoa',
      description: 'Con vegetales de temporada',
      price: '13€',
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=400&fit=crop&auto=format',
      tags: ['gluten-free']
    },
    {
      id: 6,
      name: 'Granola Casolana',
      description: 'Yogur natural, plátano, arándanos, coco rallado y miel',
      price: '12€',
      image: '/assets/images/menu/granola_casolana.webp',
      tags: ['vegetarian', 'gluten-free']
    },
    {
      id: 7,
      name: 'Huevos Benedict',
      description: 'Con jamón ibérico y salsa holandesa',
      price: '16€',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=400&fit=crop&auto=format',
      tags: []
    },
    {
      id: 8,
      name: 'Smoothie bowl',
      description: 'Con frutas tropicales y granola',
      price: '11€',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=400&fit=crop&auto=format',
      tags: ['vegetarian', 'gluten-free']
    }
  ]

  const filteredItems = menuItems.filter(item => {
    if (activeFilter === 'all') return true
    return item.tags.includes(activeFilter)
  })

  return (
    <section className="menu-teaser" id="menu">
      <div className="container">
        <header className="section-header">
          <h2>Nuestros favoritos</h2>
          <p>Una selección de nuestros platos más queridos</p>
        </header>
        
        <div className="menu-filters">
          <button 
            className={activeFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </button>
          <button 
            className={activeFilter === 'vegetarian' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveFilter('vegetarian')}
          >
            <span className="icon">🌱</span>
            Vegetariano
          </button>
          <button 
            className={activeFilter === 'gluten-free' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveFilter('gluten-free')}
          >
            <span className="icon">🌾</span>
            Sin gluten
          </button>
        </div>
        
        <div className="menu-grid stagger-animation">
          {filteredItems.map((item) => (
            <article key={item.id} className="menu-item">
              <SmartImage 
                src={item.image} 
                fallbackSrc={item.image.replace('.webp', '.jpg')}
                alt={item.name}
                width="200"
                height="200"
                loading="lazy"
              />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">{item.price}</span>
            </article>
          ))}
        </div>
        
        <div className="menu-ctas">
          <a href="404.html" className="btn btn-primary">Ver carta completa</a>
          <a 
            href="https://wa.me/34930123456?text=Hola,%20me%20gustaría%20hacer%20un%20pedido" 
            className="btn btn-secondary" 
            target="_blank" 
            rel="noopener"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default MenuTeaser