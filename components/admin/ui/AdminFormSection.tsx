import * as React from "react"
import { AdminCard, AdminCardContent, AdminCardDescription, AdminCardHeader, AdminCardTitle } from "./AdminCard"
import { cn } from "@/lib/utils"

interface AdminFormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export function AdminFormSection({ title, description, className, children, ...props }: AdminFormSectionProps) {
  return (
    <AdminCard className={cn("admin-form-section", className)} {...props}>
      <AdminCardHeader>
        <AdminCardTitle>{title}</AdminCardTitle>
        {description ? <AdminCardDescription>{description}</AdminCardDescription> : null}
      </AdminCardHeader>
      <AdminCardContent className="space-y-4">{children}</AdminCardContent>
    </AdminCard>
  )
}
