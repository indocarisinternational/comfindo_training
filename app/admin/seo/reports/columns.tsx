"use client"

import { ColumnDef } from "@tanstack/react-table"
import { SeoDailyReport } from "../types"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export const columns: ColumnDef<SeoDailyReport>[] = [
  {
    accessorKey: "report_date",
    header: "Report Date",
    cell: ({ row }) => {
      const dateStr = row.getValue("report_date") as string
      if (!dateStr) return "-"
      return new Date(dateStr).toLocaleDateString("id-ID")
    }
  },
  {
    accessorKey: "summary",
    header: "Summary",
    cell: ({ row }) => <div className="max-w-[300px] truncate" title={row.getValue("summary")}>{row.getValue("summary")}</div>
  },
  {
    accessorKey: "articles_generated",
    header: "Articles Generated",
  },
  {
    accessorKey: "audits_created",
    header: "Audits Created",
  },
  {
    accessorKey: "tasks_created",
    header: "Tasks Created",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const report = row.original
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/seo/reports/${report.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Link>
        </Button>
      )
    },
  },
]
