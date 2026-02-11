import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href: string }[]
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="bg-muted/30 py-12 md:py-20">
      <div className="container text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-primary">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{description}</p>
        )}
        {breadcrumbs && (
          <nav className="flex justify-center text-sm text-muted-foreground">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4" />
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-foreground">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  )
}
