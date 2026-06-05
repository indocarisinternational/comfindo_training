import * as React from "react"
import { cn } from "@/lib/utils"

const AdminCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { hoverEffect?: boolean }
>(({ className, hoverEffect = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[8px] bg-[var(--card)] text-[var(--card-foreground)] shadow-none transition-all duration-200 border-none",
      hoverEffect && "hover:shadow-[0_8px_8px_rgba(0,0,0,0.3)] hover:-translate-y-1",
      className
    )}
    {...props}
  />
))
AdminCard.displayName = "AdminCard"

const AdminCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
AdminCardHeader.displayName = "AdminCardHeader"

const AdminCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-bold text-[18px] tracking-tight text-[var(--foreground)]", className)}
    {...props}
  />
))
AdminCardTitle.displayName = "AdminCardTitle"

const AdminCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-[14px] text-[var(--muted-foreground)]", className)}
    {...props}
  />
))
AdminCardDescription.displayName = "AdminCardDescription"

const AdminCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
AdminCardContent.displayName = "AdminCardContent"

const AdminCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
AdminCardFooter.displayName = "AdminCardFooter"

export { AdminCard, AdminCardHeader, AdminCardFooter, AdminCardTitle, AdminCardDescription, AdminCardContent }
