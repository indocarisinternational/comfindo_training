import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export const AdminTextarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<typeof Textarea>>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        className={cn(
          "min-h-[120px] p-5 bg-[var(--input)] text-[var(--foreground)] border-0 placeholder:text-[var(--muted-foreground)] focus-visible:ring-1 focus-visible:ring-[var(--foreground)] transition-shadow shadow-none",
          "dark:shadow-[0_1px_0_rgb(18,18,18),_inset_0_0_0_1px_rgb(124,124,124)]",
          "shadow-[0_1px_0_rgb(240,240,240),_inset_0_0_0_1px_rgb(200,200,200)]",
          "rounded-[16px]",
          className
        )}
        {...props}
      />
    )
  }
)
AdminTextarea.displayName = "AdminTextarea"
