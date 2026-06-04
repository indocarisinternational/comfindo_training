"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SeoTask } from "../types"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<SeoTask>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "task_type",
    header: "Type",
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("task_type")}</Badge>
    }
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      let variant: "default" | "secondary" | "destructive" | "outline" = "outline"
      if (priority === 'high') variant = "destructive"
      if (priority === 'medium') variant = "secondary"
      if (priority === 'low') variant = "outline"
      return <Badge variant={variant}>{priority}</Badge>
    }
  },
  {
    accessorKey: "page_url",
    header: "Page URL",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let variant: "default" | "secondary" | "destructive" | "outline" = "outline"
      if (status === 'open') variant = "secondary"
      if (status === 'in_progress') variant = "default"
      if (status === 'done') variant = "default" // could be green
      if (status === 'ignored') variant = "outline"
      return <Badge variant={variant}>{status}</Badge>
    }
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const dateStr = row.getValue("created_at") as string
      if (!dateStr) return "-"
      return new Date(dateStr).toLocaleDateString("id-ID")
    }
  },
]
