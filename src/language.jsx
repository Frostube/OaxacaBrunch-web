import React, { createContext, useContext, useEffect, useState } from 'react'
import { copy } from './i18n'

const LanguageContext = createContext({
  lang: 'es',
  setLang: () => {}
})

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'es'
    return localStorage.getItem('preferredLanguage') || 'es'
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang)
      document.documentElement.setAttribute('lang', lang)
    }
  }, [lang])

  const value = { lang, setLang }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

export const getCopy = (lang) => copy[lang] || copy.es
