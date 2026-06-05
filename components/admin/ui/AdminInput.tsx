import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export const AdminInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          "h-11 px-4 bg-[var(--background)] text-[var(--foreground)] border border-[var(--input)] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:border-transparent transition-all shadow-sm",
          "rounded-[8px]",
          className
        )}
        {...props}
      />
    )
  }
)
AdminInput.displayName = "AdminInput"
