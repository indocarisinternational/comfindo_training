import { Loader2 } from "lucide-react"

export function AdminLoadingState({ label = "Loading admin data" }: { label?: string }) {
  return (
    <div className="admin-state-surface">
      <div className="admin-state-icon">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
      <p className="admin-state-title">{label}</p>
    </div>
  )
}
