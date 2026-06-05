import * as React from "react"
import { AdminCard, AdminCardContent, AdminCardHeader, AdminCardTitle } from "./AdminCard"
import { LucideIcon } from "lucide-react"

interface AdminStatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function AdminStatCard({ title, value, icon: Icon, description, trend }: AdminStatCardProps) {
  return (
    <AdminCard hoverEffect>
      <AdminCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6 px-6">
        <AdminCardTitle className="text-[14px] font-semibold text-[var(--muted-foreground)] tracking-tight">{title}</AdminCardTitle>
        <div className="text-[var(--primary)] bg-[var(--primary)]/10 p-2 rounded-md">
          <Icon className="h-4 w-4" />
        </div>
      </AdminCardHeader>
      <AdminCardContent className="px-6 pb-6 pt-2">
        <div className="text-[36px] font-semibold text-[var(--foreground)] tracking-tight leading-[1.2]">{value}</div>
        {(description || trend) && (
          <div className="flex items-center mt-2 text-[12px]">
            {trend && (
              <span className={`font-bold mr-2 ${trend.isPositive ? 'text-[var(--primary)]' : 'text-[var(--destructive)]'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
            {description && <span className="text-[var(--muted-foreground)] font-normal">{description}</span>}
          </div>
        )}
      </AdminCardContent>
    </AdminCard>
  )
}
