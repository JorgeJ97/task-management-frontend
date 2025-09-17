import { useContext } from "react";
import { TaskStore } from "@/stores/tasks.store";
import { TaskStoreContext } from "@/context/task-store.context";

export const useTaskStore = (): TaskStore => {
    const context = useContext(TaskStoreContext);

    if(!context) {
        throw new Error('useTaskStore must be used within a TaskStoreProvider')
    }
    return context;
}