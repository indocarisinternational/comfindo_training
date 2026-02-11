"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react" 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export type Consultation = {
  id: string
  name: string
  company: string
  email: string
  phone: string
  service_name: string
  status: "new" | "contacted" | "closed"
  created_at: string
}

export const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"))
        return <div>{date.toLocaleDateString("id-ID")}</div>
    }
  },
  {
    accessorKey: "service_name",
    header: "Service",
  },
   {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
            <Badge variant={status === 'contacted' ? 'default' : status === 'new' ? 'secondary' : 'outline'}>
                {status}
            </Badge>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const consultation = row.original
 
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
              onClick={() => navigator.clipboard.writeText(consultation.email)}
            >
              Copy Email
            </DropdownMenuItem>
             <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(consultation.phone)}
            >
              Copy Phone
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
