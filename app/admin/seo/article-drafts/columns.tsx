"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SeoArticleDraft } from "../types"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export const columns: ColumnDef<SeoArticleDraft>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "focus_keyword",
    header: "Focus Keyword",
  },
  {
    accessorKey: "target_url",
    header: "Target URL",
  },
  {
    accessorKey: "quality_score",
    header: "Score",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let variant: "default" | "secondary" | "destructive" | "outline" = "outline"
      if (status === 'draft') variant = "secondary"
      if (status === 'approved') variant = "default" // could be green
      if (status === 'rejected') variant = "destructive"
      if (status === 'published') variant = "default" // could be blue
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
  {
    id: "actions",
    cell: ({ row }) => {
      const draft = row.original
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/seo/article-drafts/${draft.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            Review
          </Link>
        </Button>
      )
    },
  },
]
