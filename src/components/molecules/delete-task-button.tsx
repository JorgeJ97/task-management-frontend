// components/molecules/DeleteTaskButton.tsx
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/atoms/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/atoms/alert-dialog"
import { useTaskMutations } from "@/hooks/useTasksMutations"; 
import type { ITask } from "@/types/tasks.types";

interface DeleteTaskButtonProps {
  task: ITask;
  onSuccess?: () => void;
}

export const DeleteTaskButton = ({ task, onSuccess }: DeleteTaskButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteTask, isDeleting } = useTaskMutations();

  const handleDelete = async () => {
      deleteTask(task._id);
      setIsOpen(false);
      onSuccess?.();
  };

  return (
    <>
      <Button
        variant="ghost"
        className="w-full flex justify-between text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => setIsOpen(true)}
        disabled={isDeleting}
      >
        Eliminar
        <Trash className="h-4 w-4" />
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La tarea "{task.title}" será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};