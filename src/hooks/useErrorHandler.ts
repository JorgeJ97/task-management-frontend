import { useError } from '@/context/error.context';
import type { Operations } from '@/stores/error.store';
import { useCallback } from 'react';

export const useErrorHandler = () => {
  const { 
    handleApiError, 
    handleCrudError, 
    handleCrudSuccess,
    showError, 
    showSuccess, 
    showWarning,
    showInfo,
    showLoading
  } = useError();

  // Handler específico para operaciones asíncronas
  const handleAsyncError = useCallback((error: unknown, fallbackMessage?: string) => {
    console.error('Async operation error:', error);
    handleApiError(error, fallbackMessage);
  }, [handleApiError]);

  // Handler para promesas con loading state
  const handleAsyncOperation = useCallback(<T,>(
    promise: Promise<T>,
    options: {
      loadingMessage: string;
      successMessage?: string;
      errorMessage?: string;
    }
  ): Promise<T> => {
    showLoading(options.loadingMessage, promise, {
      success: options.successMessage,
      error: options.errorMessage,
    });
    
    return promise;
  }, [showLoading]);

  // Helper específico para tareas
  const handleTaskOperation = useCallback((
    promise: Promise<any>,
    operation: Operations
  ) => {

    return promise
      .then((result) => {
        if (operation !== 'get') {
          handleCrudSuccess(operation);
        }
        return result;
      })
      .catch((error) => {
        handleCrudError(error, operation);
        throw error; // Re-throw para que el componente pueda manejarlo si necesita
      });
  }, [handleCrudError, handleCrudSuccess]);

  return {
    // Handlers básicos
    handleApiError,
    handleAsyncError,
    handleAsyncOperation,
    handleTaskOperation,
    
    // CRUD helpers
    handleCrudError,
    handleCrudSuccess,
    
    // Toast directo
    showError,
    showSuccess,
    showWarning,
    showInfo,
    showLoading,
  };
};