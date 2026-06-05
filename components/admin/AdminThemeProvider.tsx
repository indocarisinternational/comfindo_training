"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark"

interface AdminThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "dark"
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined)

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const wrapper = document.getElementById("admin-wrapper")
    if (wrapper) {
      wrapper.classList.add("dark") // Ensure Next Themes or native CSS always sees dark
    }
  }, [])

  return (
    <AdminThemeContext.Provider value={{ theme: "dark", setTheme: () => {}, resolvedTheme: "dark" }}>
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
