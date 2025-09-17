import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { authService } from '@/services/auth.service';

const AuthSync: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    // Registrar callbacks en el authService
    authService.setLoginCallback(() => loginWithRedirect());
    authService.setLogoutCallback(() => logout({ logoutParams: { returnTo: window.location.origin } }));

    // Sincronizar estado de autenticación
    const syncAuthState = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          authService.setAuthState(token, true);
        } catch (error) {
          console.error('Error getting token:', error);
          authService.setAuthState(null, false);
        }
      } else {
        authService.setAuthState(null, false);
      }
    };

    syncAuthState();
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout]);

  return <>{children}</>;
};

export default AuthSync;