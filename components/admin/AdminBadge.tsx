import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Tone = "default" | "purple" | "orange" | "green" | "pink" | "muted" | "danger"

interface AdminBadgeProps extends BadgeProps {
  tone?: Tone
}

export function AdminBadge({ className, tone = "default", ...props }: AdminBadgeProps) {
  return (
    <Badge
      className={cn("admin-badge", `admin-badge-${tone}`, className)}
      {...props}
    />
  )
}
