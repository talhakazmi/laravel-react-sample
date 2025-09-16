import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { todoAddService } from "../_services/todoAdd.services";
import { TodoAdd } from "../AddTodo.types";

export const useAddTodo = (): UseMutationResult<
Awaited<ReturnType<typeof todoAddService.add>>,
unknown,
{
    data: TodoAdd
}
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ data }) => await todoAddService.add(data),
        onSettled: () => queryClient.invalidateQueries({queryKey: ['list']}),
    });
};