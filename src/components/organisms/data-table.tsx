import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/table"

import { DataTablePagination } from "../molecules/data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import type { PaginationInfo } from "@/types/tasks.types"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pagination?: PaginationInfo
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void 
  isLoading?:boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPaginationChange
}: DataTableProps<TData, TValue>) {
  
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

    const paginationState = React.useMemo(() => ({
    pageIndex: pagination ? pagination.page - 1 : 0, // Convertir de base 1 a base 0
    pageSize: pagination?.limit || 10,
  }), [pagination])

    const pageCount = React.useMemo(() => 
    pagination?.pages || 0, // Usar el total de páginas del backend
  [pagination])

  const handlePaginationChange: OnChangeFn<PaginationState> = React.useCallback(
    (updaterOrValue: { pageIndex: number; pageSize: number } | ((arg0: {
        pageIndex: number // Convertir de base 1 a base 0
        pageSize: number
      }) => any)) => {
      if (!onPaginationChange) return;

      if (typeof updaterOrValue === 'function') {
        // Si es una función updater, la ejecutamos para obtener el nuevo estado
        const newPagination = updaterOrValue(paginationState);
        onPaginationChange(newPagination);
      } else {
        // Si es un objeto directo, lo pasamos directamente
        onPaginationChange(updaterOrValue);
      }
    },
    [onPaginationChange, paginationState]
  );

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount:pageCount,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: paginationState
    },
    enableRowSelection: true,
    onPaginationChange:handlePaginationChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4 h-full flex flex-col">
      <DataTableToolbar table={table} />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}