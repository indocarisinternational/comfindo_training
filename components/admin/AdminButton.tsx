import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AdminButton({ className, variant, ...props }: ButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn("admin-button", className)}
      {...props}
    />
  )
}
