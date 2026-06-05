import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AdminCard } from "./AdminCard"

interface AdminTableProps {
  children: React.ReactNode
}

export function AdminTableWrapper({ children }: AdminTableProps) {
  return (
    <AdminCard className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        {children}
      </div>
    </AdminCard>
  )
}

export function AdminTable({ children, ...props }: React.ComponentProps<typeof Table>) {
  return <Table className="w-full text-[14px]" {...props}>{children}</Table>
}

export function AdminTableHeader({ children, ...props }: React.ComponentProps<typeof TableHeader>) {
  return <TableHeader className="border-b border-[var(--border)]" {...props}>{children}</TableHeader>
}

export function AdminTableHead({ children, className, ...props }: React.ComponentProps<typeof TableHead>) {
  return <TableHead className={`h-12 px-6 text-left align-middle font-bold text-[12px] uppercase tracking-wider text-[var(--muted-foreground)] ${className || ""}`} {...props}>{children}</TableHead>
}

export function AdminTableBody({ children, ...props }: React.ComponentProps<typeof TableBody>) {
  return <TableBody className="[&_tr:last-child]:border-0" {...props}>{children}</TableBody>
}

export function AdminTableRow({ children, className, ...props }: React.ComponentProps<typeof TableRow>) {
  return <TableRow className={`border-b border-[var(--border)] transition-colors hover:bg-[var(--secondary)] data-[state=selected]:bg-[var(--secondary)] ${className || ""}`} {...props}>{children}</TableRow>
}

export function AdminTableCell({ children, className, ...props }: React.ComponentProps<typeof TableCell>) {
  return <TableCell className={`p-4 px-6 align-middle text-[var(--foreground)] ${className || ""}`} {...props}>{children}</TableCell>
}
