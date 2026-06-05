"use client"

import * as React from "react"
import { Search } from "lucide-react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { AdminButton } from "@/components/admin/AdminButton"
import { AdminEmptyState } from "@/components/admin/ui/AdminEmptyState"
import { AdminInput } from "@/components/admin/ui/AdminInput"
import {
  AdminTable,
  AdminTableBody,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeader,
  AdminTableRow,
  AdminTableWrapper,
} from "@/components/admin/ui/AdminTable"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="admin-data-table space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <AdminInput
            placeholder="Search records"
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="pl-10"
          />
        </label>
        <p className="text-[13px] text-[var(--muted-foreground)]">
          {table.getFilteredRowModel().rows.length} records
        </p>
      </div>

      <AdminTableWrapper>
        <AdminTable>
          <AdminTableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <AdminTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <AdminTableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </AdminTableHead>
                ))}
              </AdminTableRow>
            ))}
          </AdminTableHeader>
          <AdminTableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <AdminTableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <AdminTableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </AdminTableCell>
                  ))}
                </AdminTableRow>
              ))
            ) : (
              <AdminTableRow>
                <AdminTableCell colSpan={columns.length} className="p-0">
                  <AdminEmptyState
                    title="No records found"
                    description="Try changing the search query or clearing active filters."
                  />
                </AdminTableCell>
              </AdminTableRow>
            )}
          </AdminTableBody>
        </AdminTable>
      </AdminTableWrapper>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-[var(--muted-foreground)]">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </p>
        <div className="flex items-center gap-2">
          <AdminButton
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </AdminButton>
          <AdminButton
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </AdminButton>
        </div>
      </div>
    </div>
  )
}
