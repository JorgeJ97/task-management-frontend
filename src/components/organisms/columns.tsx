import type { ColumnDef } from "@tanstack/react-table"
import { categories, priorities, statuses } from "../../data/table-data"
import type { Task } from "../../schemas/schema"
import { DataTableColumnHeader } from "../molecules/data-table-column-header"
import { DataTableRowActions } from "../molecules/data-table-row-actions"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const PRIORITY_STYLES_GRADIENT = {
  low: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-100 hover:from-green-200 hover:to-emerald-200",
  medium: "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-100 hover:from-yellow-200 hover:to-amber-200",
  high: "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-100 hover:from-red-200 hover:to-pink-200",
} as const

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Título" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[150px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" />
    ),
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-[250px] truncate text-sm text-muted-foreground">
          {description || "Sin descripción"}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "completed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const completed = row.getValue("completed") as boolean
      const status = completed ? statuses[0] : statuses[1]

      return (
        <div className="flex max-w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoría" />
    ),
    cell: ({ row }) => {
      const category = categories.find(
        (cat) => cat.value === row.getValue("category")
      )

      if (!category) {
        return null
      }

      return (
        <div className="flex items-center">
          {category.icon && (
            <category.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{category.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string
      return Array.isArray(value) ? value.includes(rowValue) : value === rowValue
    },
    enableSorting: false
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prioridad" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (prio) => prio.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className={`${PRIORITY_STYLES_GRADIENT[priority.value]} px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 shadow-sm backdrop-blur-sm`}>
            {priority.label}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string
      return Array.isArray(value) ? value.includes(rowValue) : value === rowValue
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Límite" />
    ),
    cell: ({ row }) => {
      const deadline = row.getValue("deadline") as Date | undefined
      
      if (!deadline) {
        return <span className="text-muted-foreground">Sin fecha</span>
      }

      return (
        <div className="text-sm">
          {format(new Date(deadline), "PP", { locale: es })}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creado" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date
      
      return (
        <div className="text-sm text-muted-foreground">
          {format(new Date(createdAt), "PP", { locale: es })}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableHiding: false,
  },
]