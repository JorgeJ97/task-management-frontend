import axios, { AxiosHeaders } from 'axios';
import { authService } from '@/services/auth.service';
import { errorStore } from '@/stores/error.store'; 

const baseURL = import.meta.env.VITE_HOST_API || 'http://localhost:3000/api';

export const tasksAPI = axios.create({
  baseURL,
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
});

// Request interceptor
tasksAPI.interceptors.request.use(
  async (config) => {
    try {
      
      let token = authService.getToken();
      let isAuthenticated = authService.getIsAuthenticated();
    if(!isAuthenticated || !token) {
      await new Promise(resolve => setTimeout(resolve,1000))
      token = authService.getToken();
      isAuthenticated = authService.getIsAuthenticated();
    }
  
      if (isAuthenticated && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error adding authorization header:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


tasksAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    
    // Errores de red 
    if (!response) {
      console.error('Network error:', error);
      errorStore.showError(
        'Error de Conexión', 
        'No se pudo conectar al servidor. Verifica tu conexión.',
        {
          label: 'Reintentar',
          onClick: () => window.location.reload()
        }
      );
      return Promise.reject(error);
    }

    const { status, data } = response;
    
    switch (status) {
      case 400:
        // Errores de validación 
        console.log('Validation error:', data?.message || data?.error);
        break;
        
      case 401:
        console.log('Unauthorized:', data?.message || data?.error);
        errorStore.showError(
          'Sesión Expirada', 
          'Tu sesión ha expirado. Serás redirigido al login.'
        );
        await authService.logout();
        break;
        
      case 403:
        errorStore.showError(
          'Sin Permisos', 
          'No tienes permisos para realizar esta acción.'
        );
        break;
        
      case 404:
        // Para 404, dejamos que cada operación decida si mostrar error o no
        console.log('Resource not found:', data?.message || data?.error);
        break;
        
      case 429:
        errorStore.showError(
          'Demasiadas Solicitudes', 
          'Has realizado demasiadas solicitudes. Espera un momento.',
          {
            label: 'Reintentar en 30s',
            onClick: () => {
              setTimeout(() => window.location.reload(), 30000);
            }
          }
        );
        break;
        
      case 500:
      case 502:
      case 503:
      case 504:
        errorStore.showError(
          'Error del Servidor', 
          'Algo salió mal en el servidor. Intenta nuevamente.',
          {
            label: 'Reintentar',
            onClick: () => window.location.reload()
          }
        );
        break;
        
      default:
        if (status >= 400) {
          errorStore.showError(
            'Error',
            data?.message || data?.error || 'Ocurrió un error inesperado'
          );
        }
    }
    
    return Promise.reject(error);
  }
);

// Helper para operaciones que no quieren mostrar toast automático
// export const tasksAPISilent = axios.create({
//   baseURL,
//   headers: new AxiosHeaders({
//     'Content-Type': 'application/json',
//   }),
//   withCredentials: true,
// });

// tasksAPISilent.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = authService.getToken();
//       const isAuthenticated = authService.getIsAuthenticated();
      
//       if (isAuthenticated && token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error('Error adding authorization header:', error);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // solo manejamos logout en 401, sin toasts
// tasksAPISilent.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await authService.logout();
//     }
//     return Promise.reject(error);
//   }
// );
