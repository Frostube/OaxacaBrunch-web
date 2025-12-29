import React, { useState, useEffect } from 'react'
import SmartImage from './SmartImage'
import { useLanguage, getCopy } from '../language.jsx'

const MenuTeaser = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const { lang } = useLanguage()
  const menuCopy = getCopy(lang).menuTeaser
  const menuItems = menuCopy.items

  // Fix stagger animation - ensure it's visible
  useEffect(() => {
    const el = document.querySelector('.stagger-animation')
    if (el) {
      el.classList.add('animate')
    }
  }, [])

  const filteredItems = menuItems.filter(item => {
    if (activeFilter === 'all') return true
    return item.tags.includes(activeFilter)
  })

  return (
    <section className="menu-teaser" id="menu">
      <div className="container">
        <header className="section-header">
          <h2>{menuCopy.title}</h2>
          <p>{menuCopy.subtitle}</p>
        </header>
        
        <div className="menu-filters">
          <button 
            className={activeFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveFilter('all')}
          >
            {menuCopy.filters.all}
          </button>
          <button 
            className={activeFilter === 'vegetarian' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveFilter('vegetarian')}
          >
            <span className="icon">🌱</span>
            {menuCopy.filters.vegetarian}
          </button>
          <button 
            className={activeFilter === 'gluten-free' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setActiveFilter('gluten-free')}
          >
            <span className="icon">🌾</span>
            {menuCopy.filters.glutenFree}
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
          <a href="404.html" className="btn btn-primary">{menuCopy.buttons.viewMenu}</a>
          <a 
            href={menuCopy.buttons.whatsappUrl} 
            className="btn btn-secondary" 
            target="_blank" 
            rel="noopener"
          >
            {menuCopy.buttons.whatsapp}
          </a>
        </div>
      </div>
    </section>
  )
}

export default MenuTeaser
