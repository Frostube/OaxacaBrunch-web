import React, { useState, useEffect } from 'react'

const Visit = () => {
  const [currentDay, setCurrentDay] = useState('')
  const [openStatus, setOpenStatus] = useState('')

  const hoursData = [
    { day: 'Lunes', time: '08:00 - 13:30 / 15:30 - 18:00', dayNum: 1 },
    { day: 'Martes - Miércoles', time: 'Cerrado', dayNum: [2, 3] },
    { day: 'Jueves - Viernes', time: '08:00 - 13:30 / 15:30 - 18:00', dayNum: [4, 5] },
    { day: 'Sábado - Domingo', time: '08:30 - 18:00', dayNum: [6, 0] }
  ]

  useEffect(() => {
    const updateCurrentDay = () => {
      const now = new Date()
      const dayNum = now.getDay() // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      // Find current day's hours
      const todayHours = hoursData.find(item => {
        if (Array.isArray(item.dayNum)) {
          return item.dayNum.includes(dayNum)
        }
        return item.dayNum === dayNum
      })

      setCurrentDay(todayHours?.day || '')

      // Calculate open status
      if (todayHours?.time === 'Cerrado') {
        setOpenStatus('Cerrado')
      } else {
        const currentTime = currentHour + (currentMinute / 60)
        let isOpen = false

        if (dayNum === 1 || dayNum === 4 || dayNum === 5) {
          // Monday, Thursday, Friday: 08:00 - 13:30 / 15:30 - 18:00
          isOpen = (currentTime >= 8 && currentTime < 13.5) || (currentTime >= 15.5 && currentTime < 18)
        } else if (dayNum === 6 || dayNum === 0) {
          // Saturday, Sunday: 08:30 - 18:00
          isOpen = currentTime >= 8.5 && currentTime < 18
        }

        if (isOpen) {
          setOpenStatus('Abierto ahora')
        } else if (currentTime < 8 || (currentTime < 8.5 && (dayNum === 6 || dayNum === 0))) {
          const openTime = dayNum === 6 || dayNum === 0 ? 8.5 : 8
          const hoursUntilOpen = Math.ceil(openTime - currentTime)
          setOpenStatus(`Abre en ${hoursUntilOpen}h`)
        } else {
          setOpenStatus('Cerrado')
        }
      }
    }

    updateCurrentDay()
    const interval = setInterval(updateCurrentDay, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="visit" id="visit">
      <div className="container">
        <header className="section-header">
          <h2>Ven a visitarnos</h2>
        </header>
        
        <div className="visit-content">
          <div className="hours-card">
            <h3>Horarios</h3>
            <div className="hours-list">
              {hoursData.map((item, index) => (
                <div 
                  key={index}
                  className={`hours-item ${currentDay === item.day ? 'current-day' : ''}`}
                >
                  <span className="day">{item.day}</span>
                  <span className="time">{item.time}</span>
                </div>
              ))}
            </div>
            
            {openStatus && (
              <div className="status" style={{ 
                textAlign: 'center', 
                marginTop: '1rem', 
                fontWeight: '600',
                color: openStatus === 'Abierto ahora' ? 'var(--accent-2)' : 'var(--muted)'
              }}>
                {openStatus}
              </div>
            )}
            
            <div className="contact-actions">
              <a href="https://goo.gl/maps/abc123" target="_blank" rel="noopener" className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Cómo llegar
              </a>
              <a href="tel:+34930123456" className="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Llamar
              </a>
            </div>
          </div>
          
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.1234567890!2d2.2467!3d41.4500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDI3JzAwLjAiTiAywrAxNCc0OC4xIkU!5e0!3m2!1ses!2ses!4v1234567890"
              width="100%" 
              height="300" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Oaxaca Brunch en Badalona"
            />
            <div className="address">
              <h4>Dirección</h4>
              <p>
                Carrer de la Mercè, 15<br />
                08911 Badalona, Barcelona
              </p>
              <p className="transport-tip">🚇 Metro L2 Badalona Pompeu Fabra (5 min andando)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Visit
