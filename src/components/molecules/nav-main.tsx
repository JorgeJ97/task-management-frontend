import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/sidebar"
import { cn } from "@/lib/utils"
import { useNavigate, useLocation } from "react-router-dom"

interface NavMainProps {
  items: {
    title: string
    url: string
    icon: React.ComponentType<any>
    isExternal?: boolean
  }[]
}

export function NavMain({ items }: NavMainProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  const handleNavigation = (url: string, isExternal = false) => {
    if (isExternal) {
      window.location.href = url
    } else {
      navigate(url)
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon
            // Para rutas anidadas, verificamos si la ruta actual comienza con la URL del item
            const isActive = currentPath === item.url || 
                            (item.url !== '/' && currentPath.startsWith(item.url))
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  tooltip={item.title}
                  onClick={() => handleNavigation(item.url, item.isExternal)}
                  className={cn(
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="size-5" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}