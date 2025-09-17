import type { CategoryTypes, PriorityLevels } from "@/types/tasks.types"
import {
  ClockAlert,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  User,
  BriefcaseBusiness,
  AlarmClock,
  LeafyGreen,
  CircleAlert
} from "lucide-react"

export const categories = [
  {
    value: "personal" as CategoryTypes,
    label: "Personal",
    icon: User, 
  },
  {
    value: "work" as CategoryTypes,
    label: "Trabajo",
    icon: BriefcaseBusiness,
  },
  {
    value: "urgent" as CategoryTypes,
    label: "Urgente",
    icon: ClockAlert
  },
  {
    value: "reminder" as CategoryTypes,
    label: "Recordatorio",
    icon: AlarmClock,
  },
  {
    value: "general" as CategoryTypes,
    label: "General",
    icon: LeafyGreen,
  },
]

export const priorities = [
  {
    value: "low" as PriorityLevels,
    label: "Baja",
    icon: ArrowDown,
  },
  {
    value: "medium" as PriorityLevels,
    label: "Media",
    icon: ArrowRight,
  },
  {
    value: "high" as PriorityLevels,
    label: "Alta",
    icon: ArrowUp,
  },
]

export const statuses = [
  {
    value: "completed",
    label: "Completada",
    icon: CheckCircle,
  },
  {
    value: "pending",
    label: "Pendiente",
    icon: CircleAlert,
  },
]