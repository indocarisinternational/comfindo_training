import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface AdminPageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href: string }[]
}

export function AdminPageHeader({ title, description, breadcrumbs }: AdminPageHeaderProps) {
  return (
    <div className="mb-10 mt-4 max-w-3xl">
      {breadcrumbs && (
        <nav className="flex items-center gap-1.5 text-xs mb-3 font-medium text-[#787774]" aria-label="Breadcrumb">
          <Link href="/admin" className="hover:text-[#111111] transition-colors">
            Admin
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              <Link href={crumb.href} className="text-[#111111]">
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
      )}

      <h1 className="text-3xl font-semibold tracking-tight text-[#111111] leading-tight">
        {title}
      </h1>
      
      {description && (
        <p className="mt-2 text-[15px] text-[#787774] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
