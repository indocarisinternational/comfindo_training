"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react" 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { badgeVariants } from "@/components/ui/badge"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export type Training = {
  id: string
  title: string
  slug: string
  method: string
  date: string
  is_published: boolean
  price: string
}

export const columns: ColumnDef<Training>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("method")}</Badge>,
  },
  {
    accessorKey: "date",
    header: "Date/Schedule",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "is_published",
    header: "Status",
    cell: ({ row }) => {
        const isPublished = row.getValue("is_published") as boolean
        return (
            <Badge variant={isPublished ? 'default' : 'secondary'} className={isPublished ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                {isPublished ? "Published" : "Draft"}
            </Badge>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const training = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(training.id)}
            >
              Copy Training ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href={`/admin/trainings/${training.id}/edit`}>Edit Training</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => {
                if (confirm("Hapus program ini?")) {
                    const supabase = createClient()
                    const { error } = await supabase.from('training_programs').delete().eq('id', training.id)
                    if (error) {
                        toast.error("Gagal menghapus", { description: error.message })
                    } else {
                        toast.success("Berhasil menghapus")
                        window.location.reload()
                    }
                }
            }}>
              Delete Training
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
