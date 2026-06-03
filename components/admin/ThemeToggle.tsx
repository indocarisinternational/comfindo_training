"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useAdminTheme } from "./AdminThemeProvider"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useAdminTheme()

  return (
    <div className="flex items-center gap-1 p-1 rounded-md bg-[var(--muted)] border border-[var(--border)]">
      <Button
        variant="ghost"
        size="icon"
        className={`h-7 w-7 rounded-sm ${theme === "light" ? "bg-[var(--background)] shadow-sm text-[var(--foreground)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}
        onClick={() => setTheme("light")}
        title="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-7 w-7 rounded-sm ${theme === "dark" ? "bg-[var(--background)] shadow-sm text-[var(--foreground)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}
        onClick={() => setTheme("dark")}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-7 w-7 rounded-sm ${theme === "system" ? "bg-[var(--background)] shadow-sm text-[var(--foreground)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}
        onClick={() => setTheme("system")}
        title="System Preference"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  )
}
