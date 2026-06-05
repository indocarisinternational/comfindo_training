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
        <h1 className="text-[36px] font-semibold tracking-tight text-[var(--foreground)] leading-[1.2]">{title}</h1>
        {description && (
          <p className="text-[16px] text-[var(--muted-foreground)] mt-2 font-normal leading-[1.55]">{description}</p>
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
