"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SeoInternalLinkSuggestion } from "../types"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<SeoInternalLinkSuggestion>[] = [
  {
    accessorKey: "source_url",
    header: "Source URL",
    cell: ({ row }) => <div className="max-w-[200px] truncate" title={row.getValue("source_url")}>{row.getValue("source_url")}</div>
  },
  {
    accessorKey: "target_url",
    header: "Target URL",
    cell: ({ row }) => <div className="max-w-[200px] truncate" title={row.getValue("target_url")}>{row.getValue("target_url")}</div>
  },
  {
    accessorKey: "anchor_text",
    header: "Anchor Text",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let variant: "default" | "secondary" | "destructive" | "outline" = "outline"
      if (status === 'pending') variant = "secondary"
      if (status === 'approved') variant = "default"
      if (status === 'rejected') variant = "destructive"
      if (status === 'implemented') variant = "default" // green
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
