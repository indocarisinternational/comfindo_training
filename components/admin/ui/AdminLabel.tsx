import * as React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const AdminLabel = React.forwardRef<React.ElementRef<typeof Label>, React.ComponentPropsWithoutRef<typeof Label>>(
  ({ className, ...props }, ref) => (
    <Label
      ref={ref}
      className={cn("text-[14px] font-medium text-[var(--foreground)] tracking-normal mb-2 block", className)}
      {...props}
    />
  )
)
AdminLabel.displayName = "AdminLabel"
