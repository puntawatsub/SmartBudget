import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({
  children,
  defaultTheme = 'light',
  storageKey,
}) => {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) setTheme(saved)
  }, [storageKey])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
