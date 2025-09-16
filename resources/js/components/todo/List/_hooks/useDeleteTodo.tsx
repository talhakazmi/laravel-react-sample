import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../_services/todo.services";

export const useDeleteTodo = (): UseMutationResult<
unknown,
unknown,
number
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => await todoService.delete(id),
        onSettled: () => queryClient.invalidateQueries({queryKey: ['list']})
    })
};