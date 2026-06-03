"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

interface AdminThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "dark" | "light"
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined)

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light")
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage and system preference
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("admin-theme") as Theme | null
    if (stored) {
      setThemeState(stored)
    }

    const updateResolvedTheme = (currentTheme: Theme) => {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const resolved = currentTheme === "system" ? (isSystemDark ? "dark" : "light") : currentTheme
      setResolvedTheme(resolved)
      
      const wrapper = document.getElementById("admin-wrapper")
      if (wrapper) {
        if (resolved === "dark") {
          wrapper.classList.add("dark")
        } else {
          wrapper.classList.remove("dark")
        }
      }
    }

    updateResolvedTheme(stored || "system")

    // Listen to system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      setThemeState((prev) => {
        if (prev === "system") {
          updateResolvedTheme("system")
        }
        return prev
      })
    }
    
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("admin-theme", newTheme)
    
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const resolved = newTheme === "system" ? (isSystemDark ? "dark" : "light") : newTheme
    setResolvedTheme(resolved)
    
    const wrapper = document.getElementById("admin-wrapper")
    if (wrapper) {
      if (resolved === "dark") {
        wrapper.classList.add("dark")
      } else {
        wrapper.classList.remove("dark")
      }
    }
  }

  return (
    <AdminThemeContext.Provider value={{ theme, setTheme, resolvedTheme: mounted ? resolvedTheme : "light" }}>
      {children}
    </AdminThemeContext.Provider>
  )
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext)
  if (context === undefined) {
    throw new Error("useAdminTheme must be used within an AdminThemeProvider")
  }
  return context
}
