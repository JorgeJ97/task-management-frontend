import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import {Auth0Provider} from '@auth0/auth0-react'
import { TaskStoreProvider } from './context/task-store.context.tsx'
import { auth0Config } from './config/auth0.config.ts'
import { BrowserRouter as Router } from 'react-router-dom' 
import AuthSync from './providers/auth-sync.provider.tsx'
import { ErrorProvider } from './context/error.context.tsx'
import { ToastContainer } from './components/atoms/toast-cotainer.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <Router>
    <Auth0Provider 
    domain={auth0Config.domain}
    clientId={auth0Config.clientId}
    authorizationParams={{
      redirect_uri: auth0Config.authorizationParams.redirect_uri,
      audience:auth0Config.authorizationParams.audience,
      scope:auth0Config.authorizationParams.scope
    }}
    cacheLocation='localstorage'
     >
    <AuthSync>
  <QueryClientProvider client={queryClient}>
    <ErrorProvider>
  <TaskStoreProvider>
    <App />
    <ToastContainer/>
  </TaskStoreProvider>
  </ErrorProvider>
  </QueryClientProvider>
    </AuthSync>
  </Auth0Provider>
    </Router>
  </StrictMode>
)
