import { useQuery } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { useTaskStore } from './useTaskStore';
import { useEffect } from 'react';
import type { TaskFilters } from '@/types/tasks.types';

export const useTasks = () => {
  const taskStore = useTaskStore();
  
  // Verifica que taskStore y sus propiedades existan
  if (!taskStore || !taskStore.pagination) {
    throw new Error('TaskStore not properly initialized');
  }
  
  const query = useQuery({
    queryKey: ['tasks', taskStore.filters, taskStore.pagination.page, taskStore.pagination.limit],
    queryFn: async () => {

      const filters = {
  ...taskStore.filters,
  createdAtFrom: taskStore.filters.createdAtFrom?.toISOString(),
  createdAtTo: taskStore.filters.createdAtTo?.toISOString(),
} as TaskFilters;
      const params = {
        ...filters,
        page: taskStore.pagination.page,
        limit: taskStore.pagination.limit
      };
      console.log("filter params", params)
      const response = await taskService.getTasks(params);
      console.log("useTask", response);
      return response;
    },
    gcTime: 5 * 60 * 1000,
    staleTime: 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
  
  useEffect(() => {
    if (query.data?.pagination) {
      taskStore.setPagination(query.data.pagination);
    }
  }, [query.data, taskStore]);

  useEffect(() => {
    if (query.error) {
      taskStore.setError(query.error.message);
    }
  }, [query.error, taskStore]);

  return {
    ...query,
    data: query.data?.tasks || [], // Asegurar que siempre haya un array
    pagination: query.data?.pagination || taskStore.pagination,
    isPreviousData: query.isPlaceholderData // ✅ Para saber si son datos de placeholder
  };
};