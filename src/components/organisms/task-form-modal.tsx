import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { TaskForm } from "./task-form"; 
import type { TaskFormValues } from "@/schemas/validation"; 

interface TaskFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TaskFormValues) => void;
  isLoading?: boolean;
  defaultValues?: TaskFormValues;
  mode?: "create" | "edit";
}

export const TaskFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
  defaultValues,
  mode = "create",
}: TaskFormModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Crear Nueva Tarea" : "Editar Tarea"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Los campos marcados con * no pueden estar vacios."
              : "Modifica los detalles de la tarea. Los campos marcados con * no pueden estar vacios."
            }
          </DialogDescription>
        </DialogHeader>
        <TaskForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
          defaultValues={defaultValues}
          mode={mode}
        />
      </DialogContent>
    </Dialog>
  );
};


// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/atoms/dialog";
// import { TaskForm } from "./task-form"; 

// interface TaskFormModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSubmit: (values: any) => void;
//   isLoading?: boolean;
// }

// export const TaskFormModal = ({
//   open,
//   onOpenChange,
//   onSubmit,
//   isLoading = false,
// }: TaskFormModalProps) => {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>Crear Nueva Tarea</DialogTitle>
//           <DialogDescription>
//             Los campos marcados con * son obligatorios.
//           </DialogDescription>
//         </DialogHeader>
//         <TaskForm
//           onSubmit={onSubmit}
//           onCancel={() => onOpenChange(false)}
//           isLoading={isLoading}
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };