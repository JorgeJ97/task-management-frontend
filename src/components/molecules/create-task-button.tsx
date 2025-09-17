import { useState } from "react";
import { Plus } from "lucide-react";
// import { Button } from "@/components/atoms/button";
import { TaskFormModal } from "../organisms/task-form-modal"; 
import { useAuth0 } from "@auth0/auth0-react";
import { useTaskMutations } from "@/hooks/useTasksMutations"; 
import type { TaskFormValues } from "@/schemas/validation";
import type { CreateTaskData } from "@/types/tasks.types";
import { AnimatedButton } from "../atoms/animated-button";

export const CreateTaskButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth0();
  const { createTask, isCreating } = useTaskMutations();

  const handleSubmit = async (values: TaskFormValues) => {
    if (!user) {
      return;
    }

    try {
      createTask({
        ...values,
        userId: user.sub!,
        userEmail: user.email!,
      } as CreateTaskData);

      setIsOpen(false);

    } catch (error) {
    }
  };

  return (
    <>
      <AnimatedButton onClick={() => setIsOpen(true)} 
      className="ml-auto h-8 flex w-auto" 
      variant="outline"
      size="sm"
      from="from-amber-600"
      to="to-amber-600"
      >
        <Plus className="mr-2 h-4 w-4" />
        Nueva 
      </AnimatedButton >

      <TaskFormModal
        open={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
        isLoading={isCreating}
      />
    </>
  );
};