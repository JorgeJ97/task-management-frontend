
import React from "react"
import type { Table } from "@tanstack/react-table"

interface TableContextType {
  table: Table<any> | null
}

const TableContext = React.createContext<TableContextType>({
  table: null,
})

export const useTable = () => {
  const context = React.useContext(TableContext)
  if (!context) {
    throw new Error("useTable must be used within a TableProvider")
  }
  return context
}

interface TableProviderProps {
  table: Table<any>
  children: React.ReactNode
}

export const TableProvider: React.FC<TableProviderProps> = ({ 
  table, 
  children 
}) => {
  return (
    <TableContext.Provider value={{ table }}>
      {children}
    </TableContext.Provider>
  )
}