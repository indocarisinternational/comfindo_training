import { FileQuestion } from "lucide-react"

export function AdminEmptyState({ title, description, action }: { title: string, description?: string, action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-[8px] bg-[var(--card)] border border-[var(--border)] border-dashed">
      <div className="bg-[var(--secondary)] p-4 rounded-full mb-4">
        <FileQuestion className="h-8 w-8 text-[var(--muted-foreground)]" />
      </div>
      <h3 className="text-[16px] font-bold text-[var(--foreground)] tracking-tight">{title}</h3>
      {description && <p className="text-[14px] text-[var(--muted-foreground)] mt-2 max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
