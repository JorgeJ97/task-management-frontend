// components/molecules/EditTaskButton.tsx
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { TaskFormModal } from "../organisms/task-form-modal"; 
import { useTaskMutations } from "@/hooks/useTasksMutations";
import type { TaskFormValues } from "@/schemas/validation"; 
import type { ITask } from "@/types/tasks.types";
import { parseDateSafe } from "@/utils/date-utils";

interface EditTaskButtonProps {
  task: ITask;
}

export const EditTaskButton = ({ task }: EditTaskButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateTask, isUpdating } = useTaskMutations();

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      // if(values.deadline)  

      updateTask({
        id: task._id,
        data: values
      });
      setIsOpen(false);

    } catch (error) {
    }
  };

  const defaultValues: TaskFormValues = {
    title: task.title,
    description: task.description || "",
    category: task.category,
    priority: task.priority,
    deadline: parseDateSafe(task.deadline)
  };

  return (
    <>
      <Button
        variant="ghost"
        className="w-full justify-between flex "
        onClick={() => setIsOpen(true)}
      >
        Editar
        <Pencil className="h-4 w-4" />
      </Button>

      <TaskFormModal
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
        defaultValues={defaultValues}
        mode="edit"
      />
    </>
  );
};