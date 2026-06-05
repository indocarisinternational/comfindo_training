"use client"

import React, { createContext, useContext, useSyncExternalStore } from "react"

type Theme = "light" | "dark"

interface AdminThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  resolvedTheme: Theme
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined)
const ADMIN_THEME_EVENT = "admin-theme-change"

function resolveClientTheme(): Theme {
  if (typeof window === "undefined") return "light"

  const storedTheme = window.localStorage.getItem("admin-theme") as Theme | null
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function subscribeThemeChange(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(ADMIN_THEME_EVENT, callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(ADMIN_THEME_EVENT, callback)
  }
}

function getServerTheme(): Theme {
  return "light"
}

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeThemeChange, resolveClientTheme, getServerTheme)

  const setTheme = (nextTheme: Theme) => {
    window.localStorage.setItem("admin-theme", nextTheme)
    window.dispatchEvent(new Event(ADMIN_THEME_EVENT))
  }

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <AdminThemeContext.Provider value={{ theme, setTheme, toggleTheme, resolvedTheme: theme }}>
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
