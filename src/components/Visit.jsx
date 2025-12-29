import React, { useState, useEffect } from 'react'
import { useLanguage, getCopy } from '../language.jsx'

const Visit = () => {
  const { lang } = useLanguage()
  const visitCopy = getCopy(lang).visit
  const [currentDay, setCurrentDay] = useState('')
  const [openStatus, setOpenStatus] = useState('')
  const hoursData = visitCopy.hoursData

  useEffect(() => {
    const updateCurrentDay = () => {
      const now = new Date()
      const dayNum = now.getDay() // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      const todayHours = hoursData.find(item => {
        if (Array.isArray(item.dayNum)) {
          return item.dayNum.includes(dayNum)
        }
        return item.dayNum === dayNum
      })

      setCurrentDay(todayHours?.day || '')

      if (todayHours?.closed) {
        setOpenStatus(visitCopy.status.closed)
        return
      }

      const currentTime = currentHour + (currentMinute / 60)
      let isOpen = false

      if (dayNum === 1 || dayNum === 4 || dayNum === 5) {
        isOpen = (currentTime >= 8 && currentTime < 13.5) || (currentTime >= 15.5 && currentTime < 18)
      } else if (dayNum === 6 || dayNum === 0) {
        isOpen = currentTime >= 8.5 && currentTime < 18
      }

      if (isOpen) {
        setOpenStatus(visitCopy.status.open)
      } else if (currentTime < 8 || (currentTime < 8.5 && (dayNum === 6 || dayNum === 0))) {
        const openTime = dayNum === 6 || dayNum === 0 ? 8.5 : 8
        const hoursUntilOpen = Math.ceil(openTime - currentTime)
        setOpenStatus(visitCopy.status.opensIn(hoursUntilOpen))
      } else {
        setOpenStatus(visitCopy.status.closed)
      }
    }

    updateCurrentDay()
    const interval = setInterval(updateCurrentDay, 60000)
    return () => clearInterval(interval)
  }, [hoursData, visitCopy.status])

  return (
    <section className="visit" id="visit">
      <div className="container">
        <header className="section-header">
          <h2>{visitCopy.title}</h2>
        </header>
        
        <div className="visit-content">
          <div className="hours-card">
            <h3>{visitCopy.hoursTitle}</h3>
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
                color: openStatus === visitCopy.status.open ? 'var(--accent-2)' : 'var(--muted)'
              }}>
                {openStatus}
              </div>
            )}
            
            <div className="contact-actions">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Carrer+de+Arn%C3%BAs+31,+08911+Badalona" 
                target="_blank" 
                rel="noopener" 
                className="btn btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {visitCopy.buttons.directions}
              </a>
              <a href="tel:+34930123456" className="btn btn-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                {visitCopy.buttons.call}
              </a>
            </div>
          </div>
          
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps?q=Carrer+de+Arn%C3%BAs+31,+08911+Badalona&output=embed"
              width="100%" 
              height="300" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={visitCopy.mapTitle}
            />
            <div className="address">
              <h4>{visitCopy.addressTitle}</h4>
              <p>
                {visitCopy.addressLines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}<br />
                  </React.Fragment>
                ))}
              </p>
              <p className="transport-tip">{visitCopy.transport}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Visit
