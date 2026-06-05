import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AdminPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function AdminPageHeader({ title, description, action, breadcrumbs, className, ...props }: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)} {...props}>
      <div>
        {breadcrumbs?.length ? (
          <nav className="mb-3 flex flex-wrap items-center gap-2 text-[12px] text-[var(--muted-foreground)]" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={`${item.label}-${index}`}>
                {item.href ? (
                  <Link href={item.href} className="hover:text-[var(--foreground)]">{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? <span>/</span> : null}
              </React.Fragment>
            ))}
          </nav>
        ) : null}
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
