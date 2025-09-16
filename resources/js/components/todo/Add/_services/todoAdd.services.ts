import axios from "axios"
import { TodoAdd, TodoAddResponse } from "../AddTodo.types"

export const todoAddService = {
    add: async (values: TodoAdd): Promise<TodoAddResponse> => {
        const { data } = await axios.post(`/api/todos`, values);

        return data;
    }
}