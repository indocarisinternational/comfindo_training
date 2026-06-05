import * as React from "react"
import { cn } from "@/lib/utils"

interface AdminPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
}

export function AdminPageHeader({ title, description, action, className, ...props }: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)} {...props}>
      <div>
        <h1 className="text-[24px] font-bold tracking-tight text-[var(--foreground)]">{title}</h1>
        {description && (
          <p className="text-[14px] text-[var(--muted-foreground)] mt-1 font-normal">{description}</p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-2">
          {action}
        </div>
      )}
    </div>
  )
}
