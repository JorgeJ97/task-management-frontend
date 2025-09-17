import { useAuth0, User, type LogoutOptions } from '@auth0/auth0-react';

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: (options?: LogoutOptions) => void;
  user: User | undefined
}

export const useAuth = (): UseAuthReturn => {
  const { 
    isAuthenticated, 
    isLoading, 
    loginWithRedirect, 
    logout, 
    user 
  } = useAuth0();
  
  return {
    isAuthenticated,
    isLoading,
    login: () => loginWithRedirect(),
    logout: (options?: LogoutOptions) => 
      logout({ 
        ...options, 
        logoutParams: { 
          returnTo: window.location.origin,
          ...options?.logoutParams 
        } 
      }),
    user
  };
};