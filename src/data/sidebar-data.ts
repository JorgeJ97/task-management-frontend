import { 
  Home, 
  ClipboardList, 
  LogOut,
  ChartColumnIncreasing
} from "lucide-react";

export const getSidebarData = (user: any) => ({
  navMain: [
    {
      title: "Inicio",
      url: "/",
      icon: Home,
      isExternal: true // Esto redirige fuera de la app SPA
    },
    {
      title: "Tareas",
      url: "/app/tasks",
      icon: ClipboardList
    },
    {
      title: "Estadísticas",
      url: "/app/stats",
      icon: ChartColumnIncreasing
    }
  ],
  
  user: {
    name: user?.name || "Usuario",
    email: user?.email || "usuario@ejemplo.com",
    avatar: user?.picture || "/avatar-placeholder.png"
  },

  userMenuItems: [
    {
      title: "Cerrar sesión",
      action: "logout",
      icon: LogOut
    }
  ]
});