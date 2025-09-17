import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';


export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Configuración de retry
        retry: (failureCount, error) => {
          // No reintentar para errores de autenticación o permisos
          if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
              return false;
            }
          }
          
          // Reintentar hasta 2 veces para otros errores
          return failureCount < 2;
        },
        
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        
        // Configuración de cache y stale time
        gcTime: 5 * 60 * 1000, 
        staleTime: 60 * 1000,   
      },
      
      mutations: {
        // No reintentar mutaciones automáticamente
        retry: false,
      },
    },
  });
};