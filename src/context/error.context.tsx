import React, { createContext, useContext, type ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { errorStore, ErrorStore, type Operations } from '@/stores/error.store';

interface ErrorContextType {
  errorStore: ErrorStore;
  showError: (title: string, message?: string, action?: { label: string; onClick: () => void }) => void;
  showSuccess: (title: string, message?: string) => void;
  showWarning: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
  showLoading: (title: string, promise: Promise<any>, messages?: { success?: string; error?: string; }) => void;
  handleApiError: (error: unknown, customMessage?: string) => void;
  handleCrudError: (error: unknown, operation: Operations) => void;
  handleCrudSuccess: (operation: Exclude<Operations, 'get'>) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = observer(({ children }) => {
  const contextValue: ErrorContextType = {
    errorStore,
    showError: errorStore.showError,
    showSuccess: errorStore.showSuccess,
    showWarning: errorStore.showWarning,
    showInfo: errorStore.showInfo,
    showLoading: errorStore.showLoading,
    handleApiError: errorStore.handleApiError,
    handleCrudError: errorStore.handleCrudError,
    handleCrudSuccess: errorStore.handleCrudSuccess,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
});

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};