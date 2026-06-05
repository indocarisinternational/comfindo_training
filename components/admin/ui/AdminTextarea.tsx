import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export const AdminTextarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<typeof Textarea>>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        className={cn(
          "min-h-[120px] p-4 bg-[var(--background)] text-[var(--foreground)] border border-[var(--input)] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:border-transparent transition-all shadow-sm",
          "rounded-[8px]",
          className
        )}
        {...props}
      />
    )
  }
)
AdminTextarea.displayName = "AdminTextarea"
