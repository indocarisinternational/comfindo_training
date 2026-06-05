"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SeoAudit } from "../types"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export const columns: ColumnDef<SeoAudit>[] = [
  {
    accessorKey: "page_url",
    header: "Page URL",
  },
  {
    accessorKey: "audit_type",
    header: "Audit Type",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("audit_type")}</Badge>
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = row.getValue("score") as number
      let colorClass = "text-[var(--primary)]"
      if (score < 50) colorClass = "text-red-600"
      else if (score < 80) colorClass = "text-yellow-600"
      return <span className={`font-semibold ${colorClass}`}>{score || '-'}</span>
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
      const audit = row.original
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/seo/audits/${audit.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Link>
        </Button>
      )
    },
  },
]
