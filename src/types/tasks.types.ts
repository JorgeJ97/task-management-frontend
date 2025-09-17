
export type CategoryTypes = 'personal' | 'work' | 'urgent' | 'reminder' | 'general';

export type PriorityLevels = 'low' | 'medium' | 'high';

export interface TaskFilters {
    completed?: boolean | undefined;
    category?: CategoryTypes | CategoryTypes[] | undefined;
    priority?: PriorityLevels | PriorityLevels[] | undefined;
    search?: string | undefined;
    deadlineFrom?: Date | undefined;
    deadlineTo?: Date | undefined;
    createdAtFrom?: Date | undefined;
    createdAtTo?: Date | undefined;
}
export interface TaskStats {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    completionRate: number;
    tasksByCategory: Record<CategoryTypes, number>;
    tasksByPriority: Record<PriorityLevels, number>;
}
export interface CreateTaskData {
    title: string;
    description?: string | undefined;
    completed?: boolean | undefined;
    category: CategoryTypes;
    priority?: PriorityLevels | undefined;
    deadline?: Date | undefined;
    userId: string;
    userEmail: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CreateTaskData {
    title: string;
    description?: string | undefined;
    completed?: boolean | undefined;
    category: CategoryTypes;
    priority?: PriorityLevels | undefined;
    deadline?: Date | undefined;
    userId: string;
    userEmail: string;
}



export interface TasksResponse <KTask>{
    tasks: KTask[] | [];
    pagination: PaginationInfo;
}

export interface ITask{
    _id:string,
    title: string;
    description?: string;
    completed: boolean;
    category: CategoryTypes;
    priority: PriorityLevels;
    deadline?: any | Date;
    userId: string;
    userEmail: string;
    createdAt: Date | string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    statusCode: number;
}

export interface GetTaskResponseApi {
    tasks: ITask[];
    pagination: PaginationInfo;
}

export interface TaskStats {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    completionRate: number;
    tasksByCategory: Record<CategoryTypes, number>;
    tasksByPriority: Record<PriorityLevels, number>;
}