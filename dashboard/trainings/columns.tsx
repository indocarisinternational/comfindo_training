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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Training = {
  id: string
  title: string
  slug: string
  mode: "Online" | "Offline" | "Hybrid"
  start_date: string
  status: "active" | "inactive"
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
    accessorKey: "mode",
    header: "Mode",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("mode")}</Badge>,
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
        const date = new Date(row.getValue("start_date"))
        return <div>{date.toLocaleDateString("id-ID")}</div>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
            <Badge variant={status === 'active' ? 'default' : 'secondary'}>
                {status}
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
                <Link href={`/dashboard/trainings/${training.id}/edit`}>Edit Training</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
                // Implement delete logic here or trigger a dialog
                // For now, we'll handle this in the parent component or a separate cell renderer
                console.log("Delete", training.id)
            }}>
              Delete Training
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
