import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export const AdminInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          "h-12 px-5 bg-[var(--input)] text-[var(--foreground)] border-0 placeholder:text-[var(--muted-foreground)] focus-visible:ring-1 focus-visible:ring-[var(--foreground)] transition-shadow shadow-none",
          "dark:shadow-[0_1px_0_rgb(18,18,18),_inset_0_0_0_1px_rgb(124,124,124)]", 
          "shadow-[0_1px_0_rgb(240,240,240),_inset_0_0_0_1px_rgb(200,200,200)]",
          "rounded-[500px]",
          className
        )}
        {...props}
      />
    )
  }
)
AdminInput.displayName = "AdminInput"
