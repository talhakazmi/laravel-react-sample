import axios from "axios"
import { ReorderPayload, Todo } from "../Todo.types";

export const todoService = {
    list: async (): Promise<Todo[]> => {
        const { data } = await axios.get(`/api/todos`);
        return data.data;
    },
    edit: async (todo: Todo): Promise<void> => {
        return await axios.put(`/api/todos/${todo.id}`, todo);
    },
    delete: async (id: number): Promise<void> => {
        return await axios.delete(`/api/todos/${id}`);
    },
    reorder: async (payload: ReorderPayload): Promise<void> => {
        return await axios.post(`/api/todos/reorder`, payload);
    }
}