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
    <AdminCard hoverEffect className="shadow-none border-none">
      <AdminCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6 px-6">
        <AdminCardTitle className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">{title}</AdminCardTitle>
        <div className="text-[var(--primary)] bg-[var(--primary)]/10 p-2 rounded-full">
          <Icon className="h-4 w-4" />
        </div>
      </AdminCardHeader>
      <AdminCardContent className="px-6 pb-6 pt-2">
        <div className="text-[32px] font-bold text-[var(--foreground)] tracking-tighter">{value}</div>
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
