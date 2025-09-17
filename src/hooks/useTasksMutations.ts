import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { useTaskStore } from './useTaskStore';
import { useErrorHandler } from './useErrorHandler';

export const useTaskMutations = () => {
  const { handleCrudError, handleCrudSuccess} = useErrorHandler()
  const queryClient = useQueryClient();
  const taskStore = useTaskStore();

  const createMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      taskStore.setError(null);
      handleCrudSuccess('create')
    },
    onError: (error) => {
      taskStore.setError(error.message);
      handleCrudError(error,'create')
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      taskService.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      taskStore.setError(null);
      handleCrudSuccess('update')
    },
    onError: (error) => {
      taskStore.setError(error.message);
      handleCrudError(error,'update')
    }
  });

  const deleteMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      taskStore.setError(null);
      handleCrudSuccess('delete')
    },
    onError: (error) => {
      taskStore.setError(error.message);
      handleCrudError(error,'delete')
    }

  });

  const toggleTaskMutation = useMutation({
    mutationFn: taskService.toggleTaskCompletion,
    onSuccess: ()=> {
      queryClient.invalidateQueries({queryKey: ['tasks']})
      taskStore.setError(null);
      handleCrudSuccess('patch')
    },
    onError: (error) => {
      taskStore.setError(error.message);
      handleCrudError(error,'patch')
    }
  })

  return {
    createTask: createMutation.mutate,
    updateTask: updateMutation.mutate,
    deleteTask: deleteMutation.mutate,
    toggleTaskCompletion: toggleTaskMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};