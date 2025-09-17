import { z } from "zod"
import { columns } from "../components/organisms/columns"
import { DataTable } from "../components/organisms/data-table"
import {observer} from 'mobx-react-lite';
import { taskSchema } from "../schemas/schema"
import { useTasks } from "@/hooks/useTask";
import { Skeleton } from "@/components/atoms/skeleton";
import { CreateTaskButton } from "@/components/molecules/create-task-button";
import { useTaskStore } from "@/hooks/useTaskStore";



export const TaskPage = observer(() => {
    const { data: tasksData, pagination, isLoading} = useTasks();
    const taskStore = useTaskStore();

      const handlePaginationChange = (newPagination: { pageIndex: number; pageSize: number }) => {
    taskStore.setPagination({
      ...taskStore.pagination,
      page: newPagination.pageIndex + 1, // Convertir de base 0 a base 1
      limit: newPagination.pageSize
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-full flex-1 flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  const tasks = z.array(taskSchema).parse(tasksData)

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tareas</h2>
          <p className="text-muted-foreground">
            Aquí podrás gestionar tus tareas personales.
          </p>
        </div>
        <CreateTaskButton />
      </div>
      
      <div className="flex-1 overflow-hidden">
        <DataTable 
          data={tasks}
          columns={columns}
          onPaginationChange={handlePaginationChange}
          pagination={pagination}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
});