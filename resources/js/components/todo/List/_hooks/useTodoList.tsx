import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { todoService } from "../_services/todo.services";

export const useTodoList = (): UseQueryResult<
    Awaited<ReturnType<typeof todoService.list>>,
    Error
> => useQuery({
    queryKey: ['list'],
    queryFn: async () => await todoService.list(),
    retry: 1
});