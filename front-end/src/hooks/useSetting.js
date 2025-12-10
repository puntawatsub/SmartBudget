import { useState, useEffect } from 'react'

export function useSetting() {
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [currency, setCurrency] = useState('usd')
  const [region, setRegion] = useState('usa')
  const [theme, setTheme] = useState('light') // 'light' | 'dark'
  const [language, setLanguage] = useState('en')

  const url = '/api/settings'

  // Single, consistent theme application
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme === 'dark' ? 'dark' : 'light')
    // persist theme immediately so other components / App.jsx can read/apply it
    try {
      const cached =
        JSON.parse(localStorage.getItem('appSettings') || 'null') || {}
      cached.theme = theme === 'dark' ? 'Dark' : 'Light'
      localStorage.setItem('appSettings', JSON.stringify(cached))
    } catch {}
  }, [theme])

  const applySettings = (data) => {
    if (!data) return
    setTitle(data.name || data.title || '')
    setEmail(data.email || '')
    const t = (data.theme || '').toString().toLowerCase()
    setTheme(t === 'dark' ? 'dark' : 'light')
    const lang = (data.language || '').toString().toLowerCase()
    setLanguage(lang.startsWith('fin') || lang === 'fi' ? 'fi' : 'en')

    // currency mapping (unchanged)
    const cur = (data.currency || '').toString().toLowerCase()
    setCurrency(cur.includes('eur') || cur.includes('euro') ? 'eur' : 'usd')

    // simplified region mapping (like currency): if contains 'fin' => 'fi' else 'usa'
    const regRaw = (data.region || '').toString().toLowerCase()
    setRegion(regRaw.includes('fin') ? 'fi' : 'usa')
  }

  // Load settings: localStorage fallback first, then server (if token present)
  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem('appSettings') || 'null')
      if (cached) {
        applySettings(cached)
        console.log('useSetting: applied cached appSettings', cached)
      }
    } catch (e) {
      console.warn('useSetting: failed to read cached appSettings', e)
    }

    const fetchSettings = async () => {
      try {
        const token = sessionStorage.getItem('token')
        const headers = { 'Content-Type': 'application/json' }
        if (token) headers.Authorization = `Bearer ${token}`

        const res = await fetch(url, { method: 'GET', headers })
        if (!res.ok) {
          console.warn('useSetting: failed to fetch settings', res.status)
          return
        }
        const data = await res.json()
        applySettings(data)
        try {
          // store UI-friendly region code in cache
          const cacheData = {
            name: data.name || data.title || '',
            email: data.email || '',
            theme: data.theme || '',
            language: data.language || '',
            currency: data.currency || '',
            region: (data.region || '').toString().toLowerCase().includes('fin')
              ? 'fi'
              : 'usa',
          }
          localStorage.setItem('appSettings', JSON.stringify(cacheData))
        } catch {}
      } catch (err) {
        console.error('useSetting: error fetching settings', err)
      }
    }

    fetchSettings()
  }, [])

  const saveSettings = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const headers = { 'Content-Type': 'application/json' }
      if (token) headers.Authorization = `Bearer ${token}`

      await fetch(`${url}/personal`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ name: title, email }),
      })

      const serverPayload = {
        theme: theme === 'dark' ? 'Dark' : 'Light',
        language: language === 'fi' ? 'Finnish' : 'English',
        currency: currency === 'eur' ? 'Euro' : 'USD',
        region: region === 'fi' ? 'Finland' : 'USA',
      }

      await fetch(`${url}/app`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(serverPayload),
      })

      try {
        // cache UI-friendly values (region as code)
        const cached = {
          name: title,
          email,
          theme: serverPayload.theme,
          language: serverPayload.language,
          currency: serverPayload.currency,
          region: region, // 'fi' or 'usa'
        }
        localStorage.setItem('appSettings', JSON.stringify(cached))
      } catch {}

      alert('Settings saved')
    } catch (err) {
      console.error(err)
      alert('Failed to save settings')
    }
  }

  const reset = () => {
    setTitle('')
    setEmail('')
    setCurrency('usd')
    setRegion('usa')
    setTheme('light')
    setLanguage('en')
  }

  return {
    title,
    setTitle,
    email,
    setEmail,
    currency,
    setCurrency,
    region,
    setRegion,
    theme,
    setTheme,
    language,
    setLanguage,
    reset,
    saveSettings,
  }
}
