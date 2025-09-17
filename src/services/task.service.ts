import { tasksAPI } from "@/axios/axios.interceptor";
import type {CreateTaskData, ITask, PaginationInfo, TaskFilters, TaskStats } from "@/types/tasks.types";

class TaskService {
  async getTasks(filters: TaskFilters & { page?: number; limit?: number }): Promise<{
    tasks: ITask[];
    pagination: PaginationInfo;
  }> {
    // Axios maneja automáticamente los arrays en params
    const response = await tasksAPI.get('/tasks', {
      params: filters,
      paramsSerializer: {
        indexes: null 
      }
    });

    return {
      tasks: response.data?.data,
      pagination: response.data?.pagination
    }
  }

  async createTask(taskData: CreateTaskData): Promise<ITask> {
    const response = await tasksAPI.post('/tasks/create', taskData);
    return response.data?.data;
  }

  async getUserStats(): Promise<TaskStats>{
    const response = await tasksAPI.get('/tasks/stats');
    return response.data?.data;
  }

  async updateTask(id: string, taskData: Partial<CreateTaskData>): Promise<ITask> {
    const response = await tasksAPI.put(`/tasks/update/${id}`, taskData);
    return response.data?.data;
  }

  async deleteTask(id: string): Promise<void> {
    await tasksAPI.delete(`/tasks/delete/${id}`);
  }

  async toggleTaskCompletion(id:string): Promise<ITask> {
    const response = await tasksAPI.patch(`/tasks/toggle/${id}`)
    return response.data?.data;
  }

}

export const taskService = new TaskService();