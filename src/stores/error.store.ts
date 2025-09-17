import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { toast } from 'sonner';

export interface ApiError {
  success: false;
  message: string;
  error: string;
  statusCode: number;
}

export type Operations = 'create' | 'update' | 'delete' | 'get' | 'patch'

export class ErrorStore {
  constructor() {
    makeAutoObservable(this);
  }

  showError = (title: string, message?: string, action?: { label: string; onClick: () => void }) => {
    toast.error(title, {
      description: message,
      duration: 7000,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    });
  };

  showSuccess = (title: string, message?: string) => {
    toast.success(title, {
      description: message,
      duration: 4000,
    });
  };

  showWarning = (title: string, message?: string) => {
    toast.warning(title, {
      description: message,
      duration: 5000,
    });
  };

  showInfo = (title: string, message?: string) => {
    toast.info(title, {
      description: message,
      duration: 4000,
    });
  };

  // Loading toast con promise
  showLoading = (title: string, promise: Promise<any>, messages?: {
    success?: string;
    error?: string;
  }) => {
    toast.promise(promise, {
      loading: title,
      success: messages?.success || 'Completado exitosamente',
      error: messages?.error || 'Ocurrió un error',
    });
  };

  // Manejar errores de API específicamente
  handleApiError = (error: unknown, customMessage?: string) => {
    console.error('API Error:', error);
    
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError: ApiError = error.response.data;
      
      // usar mensajes personalizados
      if (customMessage) {
        this.showError('Error', customMessage);
        return;
      }
      
      switch (apiError.statusCode) {
        case 400:
          this.showError('Error de Validación', apiError.message);
          break;
        case 401:
          this.showError('Sesión Expirada', 'Por favor inicia sesión nuevamente');
          break;
        case 403:
          this.showError('Sin Permisos', 'No tienes permisos para realizar esta acción');
          break;
        case 404:
          this.showError('Recurso no encontrado', apiError.message || 'El recurso solicitado no existe');
          break;
        case 429:
          this.showError('Demasiadas Solicitudes', 'Has realizado demasiadas solicitudes. Espera un momento.');
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          this.showError('Error del Servidor', 'Algo salió mal en el servidor. Intenta nuevamente.', {
            label: 'Recargar',
            onClick: () => window.location.reload()
          });
          break;
        default:
          this.showError('Error', apiError.message || apiError.error || 'Ocurrió un error inesperado');
      }
    } else if (axios.isAxiosError(error) && !error.response) {
      // Error de red
      this.showError('Error de Conexión', 'No se pudo conectar al servidor. Verifica tu conexión.', {
        label: 'Reintentar',
        onClick: () => window.location.reload()
      });
    } else {
      // Otro tipo de error
      this.showError('Error', customMessage || 'Ocurrió un error inesperado');
    }
  };

  // Helper para operaciones CRUD comunes
  handleCrudError = (error: unknown, operation: Operations) => {
    const messages = {
      create: 'No se pudo crear la tarea',
      update: 'No se pudo actualizar la tarea', 
      delete: 'No se pudo eliminar la tarea',
      get: 'No se pudieron cargar los datos',
      patch: 'No se pudo actualizar la tarea'
    };
    
    this.handleApiError(error, messages[operation]);
  };

  // Helper para éxito de operaciones CRUD
  handleCrudSuccess = (operation: Exclude<Operations, 'get'>) => {
    const messages = {
      create: 'Tarea creada exitosamente',
      update: 'Tarea actualizada exitosamente',
      delete: 'Tarea eliminada exitosamente',
      patch: 'Tarea actualizada exitosamente'
    };
    
    this.showSuccess(messages[operation]);
  };
}

export const errorStore = new ErrorStore();