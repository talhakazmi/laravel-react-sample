import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { ReorderPayload } from "../Todo.types";
import { todoService } from "../_services/todo.services";

export const useReorderTodo = (): UseMutationResult<
unknown,
unknown,
{
    orders: ReorderPayload
}
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (orders) => todoService.reorder(orders.orders),
        onSettled: () => queryClient.invalidateQueries({queryKey: ['list']})
    });
}