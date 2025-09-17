import { X, Filter } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { DataTableViewOptions } from "../molecules/data-table-view-options"
import { categories, priorities } from "../../data/table-data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { TableBooleanFilter } from "@/components/molecules/table-boolean-filters" 
import { CheckCircle, CircleAlert } from "lucide-react"
import { useTaskStore } from "@/hooks/useTaskStore"
import type { CategoryTypes, PriorityLevels } from "@/types/tasks.types"
import type { Table } from "@tanstack/react-table"
import { DateRangeFilter } from "@/components/organisms/date-range-filter"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu"
import { useIsMobile } from "@/hooks/useIsMobile"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const taskStore = useTaskStore();
  useIsMobile();
  const [searchValue, setSearchValue] = useState(taskStore.filters.search || '')


  // Verificar si hay filtros activos
  const isFiltered = Object.values(taskStore.filters).some(
    value => value !== undefined && value !== null && value !== ''
  )

  const completedOptions = [
    { value: true, label: "Completadas", icon: CheckCircle },
    { value: false, label: "Pendientes", icon: CircleAlert }
  ]

  // Manejar búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      taskStore.setFilter('search', searchValue || undefined)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchValue, taskStore])

  // Handlers para filtros
  const handleCategoryFilter = (values: string[]) => {
    taskStore.setFilter('category', values.length > 0 ? values as CategoryTypes[] : undefined)
  }

  const handlePriorityFilter = (values: string[]) => {
    taskStore.setFilter('priority', values.length > 0 ? values as PriorityLevels[] : undefined)
  }

  const handleCompletedFilter = (value: boolean | undefined) => {
    taskStore.setFilter('completed', value)
  }

  const handleCreatedAtFromChange = (date: Date | undefined) => {
    taskStore.setFilter('createdAtFrom', date)
  }

  const handleCreatedAtToChange = (date: Date | undefined) => {
    taskStore.setFilter('createdAtTo', date)
  }

  const clearDateRange = () => {
    taskStore.setFilter('createdAtFrom', undefined)
    taskStore.setFilter('createdAtTo', undefined)
  }

  // Valores actuales de los filtros
  const currentCategories = Array.isArray(taskStore.filters.category) 
    ? taskStore.filters.category 
    : taskStore.filters.category ? [taskStore.filters.category] : []

  const currentPriorities = Array.isArray(taskStore.filters.priority) 
    ? taskStore.filters.priority 
    : taskStore.filters.priority ? [taskStore.filters.priority] : []

  const currentCompleted = taskStore.filters.completed

  // Componente para filtros móviles
  const MobileFilters = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 lg:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {isFiltered && (
            <span className="ml-2 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2 space-y-2">
          <TableBooleanFilter
            title="Estado"
            options={completedOptions}
            selectedValue={currentCompleted}
            onValueChange={handleCompletedFilter}
          />
          <DataTableFacetedFilter
            title="Categoría"
            options={categories}
            selectedValues={currentCategories}
            onValuesChange={handleCategoryFilter}
            column={table.getColumn("category")}
          />
          <DataTableFacetedFilter
            title="Prioridad"
            options={priorities}
            selectedValues={currentPriorities}
            onValuesChange={handlePriorityFilter}
            column={table.getColumn("priority")}
          />
          <div className="">
            <DateRangeFilter
              title="Fecha creación"
              fromDate={taskStore.filters.createdAtFrom}
              toDate={taskStore.filters.createdAtTo}
              onFromDateChange={handleCreatedAtFromChange}
              onToDateChange={handleCreatedAtToChange}
              onClear={clearDateRange}
            />
          </div>
        </div>
                  {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                taskStore.clearFilters()
                setSearchValue('')
              }}
              className="h-8 px-2"
            >
              Limpiar
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
      {/* Primera fila: Búsqueda y filtros móviles */}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Buscar tareas..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="h-8 flex-1 lg:w-[250px]"
        />
        <MobileFilters />
      </div>

      {/* Segunda fila: Filtros desktop y acciones */}
      <div className="flex items-center justify-between gap-2">
        {/* Filtros desktop */}
        <div className="hidden lg:flex items-center space-x-2 flex-wrap">
          <TableBooleanFilter
            title="Estado"
            options={completedOptions}
            selectedValue={currentCompleted}
            onValueChange={handleCompletedFilter}
          />
          
          <DataTableFacetedFilter
            title="Categoría"
            options={categories}
            selectedValues={currentCategories}
            onValuesChange={handleCategoryFilter}
            column={table.getColumn("category")}
          />
          
          <DataTableFacetedFilter
            title="Prioridad"
            options={priorities}
            selectedValues={currentPriorities}
            onValuesChange={handlePriorityFilter}
            column={table.getColumn("priority")}
          />
          
          <DateRangeFilter
            title="Fecha creación"
            fromDate={taskStore.filters.createdAtFrom}
            toDate={taskStore.filters.createdAtTo}
            onFromDateChange={handleCreatedAtFromChange}
            onToDateChange={handleCreatedAtToChange}
            onClear={clearDateRange}
          />

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                taskStore.clearFilters()
                setSearchValue('')
              }}
              className="h-8 px-2"
            >
              Limpiar
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Acciones */}
        <div className="flex items-center space-x-2">
          <DataTableViewOptions columns={table.getAllColumns()} />
          {/* <CreateTaskButton /> */}
        </div>
      </div>
    </div>
  )
}

// import { X } from "lucide-react"
// import { useEffect, useState } from "react"
// import { Button } from "@/components/atoms/button"
// import { Input } from "@/components/atoms/input"
// import { DataTableViewOptions } from "./data-table-view-options"
// import { categories, priorities } from "../data/data"
// import { DataTableFacetedFilter } from "./data-table-faceted-filter"
// import { TableBooleanFilter } from "@/components/molecules/table-boolean-filters" 
// import { CheckCircle, CircleAlert } from "lucide-react"
// import { useTaskStore } from "@/hooks/useTaskStore"
// import type { CategoryTypes, PriorityLevels } from "@/types/tasks.types"
// import type { Table } from "@tanstack/react-table"
// // import { CreateTaskButton } from "@/components/molecules/create-task-button"

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>
// }

// export function DataTableToolbar<TData>  ({
//   table
// }: DataTableToolbarProps<TData>) {
//   const columns = table.getAllColumns();
//   const taskStore = useTaskStore();

//   // Verificar si hay filtros activos
//   const isFiltered = Object.values(taskStore.filters).some(
//     value => value !== undefined && value !== null && value !== ''
//   )

//   // Opciones para el filtro de completed
//   const completedOptions = [
//     { value: true, label: "Completadas", icon: CheckCircle },
//     { value: false, label: "Pendientes", icon: CircleAlert }
//   ]

//     // Manejar búsqueda con debounce
//   const [searchValue, setSearchValue] = useState(
//     taskStore.filters.search || ''
//   )

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       taskStore.setFilter('search', searchValue || undefined)
//     }, 300) // Debounce de 300ms

//     return () => clearTimeout(timeoutId)
//   }, [searchValue, taskStore])

//     // Manejar filtros de categoría 
//   const handleCategoryFilter = (values: string[]) => {
//     taskStore.setFilter('category', values.length > 0 ? values as CategoryTypes[] : undefined)
//   }

//   // Manejar filtros de prioridad 
//   const handlePriorityFilter = (values: string[]) => {
//     taskStore.setFilter('priority', values.length > 0 ? values as PriorityLevels[] : undefined)
//   }

//   // Manejar filtro de estado
//   const handleCompletedFilter = (value: boolean | undefined) => {
//     taskStore.setFilter('completed', value)
//   }

//     // Obtener valores actuales para los filtros
//   const currentCategories = Array.isArray(taskStore.filters.category) 
//     ? taskStore.filters.category 
//     : taskStore.filters.category ? [taskStore.filters.category] : []

//   const currentPriorities = Array.isArray(taskStore.filters.priority) 
//     ? taskStore.filters.priority 
//     : taskStore.filters.priority ? [taskStore.filters.priority] : []

//   const currentCompleted = taskStore.filters.completed


//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex flex-1 items-center space-x-2">
//         {/* Busqueda */}
//         <Input
//           placeholder="Buscar por título o descripción..."
//           value={searchValue}
//           onChange={(event) => setSearchValue(event.target.value)}
//           className="h-8 w-[150px] lg:w-[250px]"
//         />
        
//         {/* Filtro por estado (completed) */}
      
//           <TableBooleanFilter
//             title="Estado"
//             options={completedOptions}
//             selectedValue={currentCompleted}
//             onValueChange={handleCompletedFilter}
//           />
      
        
//         {/* Filtro por categoría */}
//           <DataTableFacetedFilter
//             title="Categoría"
//             options={categories}
//             selectedValues={currentCategories}
//             onValuesChange={handleCategoryFilter}
//             column={table.getColumn("category")}

//           />
        
        
//         {/* Filtro por prioridad */}
//           <DataTableFacetedFilter
//             title="Prioridad"
//             options={priorities}
//             selectedValues={currentPriorities}
//             onValuesChange={handlePriorityFilter}
//             column={table.getColumn("priority")}
//           />
    
        
//         {isFiltered && (
//           <Button
//             variant="ghost"
//             onClick={() => {
//               taskStore.clearFilters()
//               setSearchValue('')
//             }}
//             className="h-8 px-2 lg:px-3"
//           >
//             Limpiar
//             <X className="ml-2 h-4 w-4" />
//           </Button>
//         )}
//       </div>
//       <div className="lg:flex items-center h-8 gap-2 hidden">

//       <DataTableViewOptions columns={columns} />
//       {/* <CreateTaskButton/> */}
//       </div>
//     </div>
//   )
// }