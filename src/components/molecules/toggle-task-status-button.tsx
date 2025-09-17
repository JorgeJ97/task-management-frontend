import { CheckCircle, Circle, Loader2 } from "lucide-react"
import {
  DropdownMenuItem,
} from "@/components/atoms/dropdown-menu"
import { useTaskMutations } from "@/hooks/useTasksMutations"
import type { ITask } from "@/types/tasks.types"

interface ToggleTaskStatusButtonProps {
  task: ITask
  onStatusChange?: () => void
}

export function ToggleTaskStatusButton({ 
  task, 
  onStatusChange 
}: ToggleTaskStatusButtonProps) {
  const { toggleTaskCompletion, isUpdating } = useTaskMutations()

  const handleToggleStatus = async () => {

    toggleTaskCompletion(task._id)
    onStatusChange?.()
  }

  return (
    <DropdownMenuItem 
      onClick={handleToggleStatus}
      disabled={isUpdating}
      className="flex items-center gap-2"
    >
      {isUpdating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : task.completed ? (
        <Circle className="h-4 w-4" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      <span>
        {task.completed ? "Marcar pendiente" : "Marcar completada"}
      </span>
    </DropdownMenuItem>
  )
}