import React, { createContext } from 'react';
import { taskStore, TaskStore } from '@/stores/tasks.store';

// Provee la instancia del store como valor por defecto
export const TaskStoreContext = createContext<TaskStore>(taskStore);

interface TaskStoreProviderProps {
  children: React.ReactNode;
}

export const TaskStoreProvider: React.FC<TaskStoreProviderProps> = ({ children }) => {
  return (
    <TaskStoreContext.Provider value={taskStore}>
      {children}
    </TaskStoreContext.Provider>
  );
};