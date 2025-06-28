"use client"

import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext(undefined)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light"
    }
    return "light"
  })

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const root = document.documentElement

    if (theme === "dark") {
      root.style.setProperty("--bg-color", "#1a1a1a")
      root.style.setProperty("--text-color", "#ffffff")
      root.style.setProperty("--navbar-bg", "#2d2d2d")
      root.style.setProperty("--card-bg", "rgba(255, 255, 255, 0.1)")
      root.style.setProperty("--border-color", "rgba(255, 255, 255, 0.2)")
      root.style.setProperty("--gradient-primary", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)")
      root.style.setProperty("--gradient-secondary", "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)")
    } else {
      root.style.setProperty("--bg-color", "#ffffff")
      root.style.setProperty("--text-color", "#000000")
      root.style.setProperty("--navbar-bg", "#f8f9fa")
      root.style.setProperty("--card-bg", "rgba(255, 255, 255, 0.9)")
      root.style.setProperty("--border-color", "rgba(0, 0, 0, 0.1)")
      root.style.setProperty("--gradient-primary", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)")
      root.style.setProperty("--gradient-secondary", "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)")
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
