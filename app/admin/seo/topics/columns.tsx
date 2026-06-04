"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SeoTopic } from "../types"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<SeoTopic>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "focus_keyword",
    header: "Focus Keyword",
  },
  {
    accessorKey: "intent",
    header: "Intent",
  },
  {
    accessorKey: "target_url",
    header: "Target URL",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      return <Badge variant="outline">{priority}</Badge>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let variant: "default" | "secondary" | "destructive" | "outline" = "outline"
      if (status === 'pending') variant = "secondary"
      if (status === 'generated') variant = "default"
      if (status === 'archived') variant = "destructive"
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
