import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href: string }[]
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 comfindo-gradient" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzem0wIDM2YzEuNjU3IDAgMy0xLjM0MyAzLTNzLTEuMzQzLTMtMy0zLTMgMS4zNDMtMyAzIDEuMzQzIDMgMyAzeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="container max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 relative z-10 py-16 md:py-20">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center gap-1.5 text-sm mb-4" aria-label="Breadcrumb">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                <Link href={crumb.href} className="text-white/90 font-medium">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-white/75 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" fill="none" className="w-full h-auto">
          <path d="M0 25L60 22.5C120 20 240 15 360 17.5C480 20 600 30 720 32.5C840 35 960 30 1080 25C1200 20 1320 15 1380 12.5L1440 10V50H1380C1320 50 1200 50 1080 50C960 50 840 50 720 50C600 50 480 50 360 50C240 50 120 50 60 50H0V25Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
