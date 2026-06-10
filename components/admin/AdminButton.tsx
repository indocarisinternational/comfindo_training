import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AdminButton({ className, variant, ...props }: ButtonProps) {
  const adminVariant = variant || "default"

  return (
    <Button
      variant={variant}
      className={cn("admin-button", `admin-button-${adminVariant}`, className)}
      {...props}
    />
  )
}
