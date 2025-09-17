import type { Row } from "@tanstack/react-table"
import { MoreHorizontal} from "lucide-react"

import { Button } from "@/components/atoms/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu"

import { taskSchema } from "../../schemas/schema"
import { EditTaskButton } from "@/components/molecules/edit-task-button"
import { DeleteTaskButton } from "@/components/molecules/delete-task-button"
import { ToggleTaskStatusButton } from "@/components/molecules/toggle-task-status-button"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  onStatusChange?: () => void
}

export function DataTableRowActions<TData>({
  row,
  onStatusChange
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[120px]">

                <ToggleTaskStatusButton 
          task={task} 
          onStatusChange={onStatusChange}
        />
        {/* Botón de Editar */}
        <EditTaskButton task={task} />
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        {/* Botón de Eliminar */}
        <DeleteTaskButton task={task}/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}