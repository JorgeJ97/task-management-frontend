import { z } from "zod"
// import type { CategoryTypes, PriorityLevels } from "@/types/tasks.types"


export const taskSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  category: z.enum(['personal', 'work', 'urgent', 'reminder', 'general']),
  priority: z.enum(['low', 'medium', 'high']),
  deadline: z.string().optional(),
  userId: z.string(),
  userEmail: z.email(),
  createdAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>