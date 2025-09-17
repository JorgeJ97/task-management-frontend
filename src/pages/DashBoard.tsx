import { AppSidebar } from "@/components/organisms/app-sidebar" 
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/atoms/sidebar"
import { DashBoardHeader } from "@/components/molecules/dashboard-header"
import { DashBoardTemplate } from "@/components/templates/dashboard.template"
import { Routes, Route } from 'react-router-dom'
import { TaskPage } from "@/pages/TaskPage"
import { UserStatsPage } from "./UserStatsPage"
import { HomePage } from "./HomePage"

function DashBoard() {
  return (
    <DashBoardTemplate>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col min-h-screen">
          <DashBoardHeader/>
          <main>
            <Routes>
              <Route path="home" element={<HomePage/>}/>
              <Route path="tasks" element={<TaskPage />} />
              <Route index element= {<TaskPage/>}/>
              <Route path="stats" element={<UserStatsPage />} />
            </Routes>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </DashBoardTemplate>
  )
}

export default DashBoard;