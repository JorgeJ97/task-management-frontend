import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1, "El título es requerido").max(100, "El título no puede exceder 100 caracteres"),
  description: z.string().max(500, "La descripción no puede exceder 500 caracteres").optional(),
  category: z.enum(['personal', 'work', 'urgent', 'reminder', 'general']),
  priority: z.enum(['low', 'medium', 'high']).default('medium').optional(),
  deadline: z.date().optional().nullable(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;