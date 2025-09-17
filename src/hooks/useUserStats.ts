import { taskService } from "@/services/task.service"
import { useQuery } from "@tanstack/react-query"


export const useUserStats = () => {
    const query = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const response = await taskService.getUserStats()
            console.log("User stats", response)
            return response;
        },
        gcTime: 5*60*1000,
        staleTime: 60*1000,
        placeholderData:(previousData) => previousData,
    })
    return query;
}