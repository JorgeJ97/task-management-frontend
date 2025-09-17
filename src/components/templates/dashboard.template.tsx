import type React from "react"
import { Outlet } from 'react-router-dom'

interface DashBoardLayoutProps {
  children: React.ReactNode
}

export const DashBoardTemplate: React.FC<DashBoardLayoutProps> = ({children}) => {
  return (
    <>
    {children}
    <Outlet />
    </>
  )
};
