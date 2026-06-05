import { AlertTriangle } from "lucide-react"

export function AdminErrorState({ title = "Data unavailable", description }: { title?: string; description?: string }) {
  return (
    <div className="admin-state-surface admin-error-state">
      <div className="admin-state-icon">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <p className="admin-state-title">{title}</p>
      {description ? <p className="admin-state-description">{description}</p> : null}
    </div>
  )
}
