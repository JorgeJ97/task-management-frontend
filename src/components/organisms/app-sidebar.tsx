import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/atoms/sidebar";
import { NavMain } from "../molecules/nav-main";
import { NavUser } from "./nav-user";
import { getSidebarData } from "../../data/sidebar-data";
import { Brain } from "lucide-react";
import { useAuth } from "@/hooks/useAuth"; 
import { useNavigate} from "react-router-dom";
import { GradientText } from "@/components/atoms/gradient-text";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();

  const sidebarData = getSidebarData(user);

  const handleNavigation = (url: string) => {
   navigate(`/app${url}`);
  };

  const handleUserAction = (item: any) => {
    if (item.action === "logout") {
      logout();
    } else if (item.url) {
      navigate(`/app${item.url}`);
    }
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
              onClick={() => handleNavigation("/tasks")}
            >
              <a href="app" onClick={(e) => e.preventDefault()}>
               <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-700 rounded-lg">
                  <Brain />
               </div>
                <GradientText className=" text-2xl">TaskManager</GradientText>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain 
          items={sidebarData.navMain} 
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={sidebarData.user} 
          menuItems={sidebarData.userMenuItems}
          onAction={handleUserAction}
          isAuthenticated={isAuthenticated}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

