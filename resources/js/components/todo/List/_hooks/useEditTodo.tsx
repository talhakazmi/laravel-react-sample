import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../_services/todo.services";
import { Todo } from "../Todo.types";

export const useEditTodo = (): UseMutationResult<
Awaited<ReturnType<typeof todoService.edit>>,
unknown,
{
    data: Todo
}
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ data }) => await todoService.edit(data),
        onSettled: () => queryClient.invalidateQueries({queryKey: ['list']})
    })
}