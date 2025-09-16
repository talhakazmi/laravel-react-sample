import { ReactElement, useEffect } from "react";
import { EditProps, Todo } from "../Todo.types";
import { Input, Textarea, Spinner, Dialog } from 'react-ui';
import { useForm } from "react-hook-form";
import { useEditTodo } from "../_hooks/useEditTodo";

const EditTodo = ({
    todo,
    isOpen,
    onOpenChange
}: EditProps): ReactElement => {

    const {mutate: editTodo, isPending: isLoading} = useEditTodo();

    const {register, handleSubmit, formState: {errors}} = useForm<Todo>({
        defaultValues: {
            id: todo.id,
            name: todo.name,
            description: todo.description
        }
    });

    const onSubmit = (values: Todo): void => {
        editTodo({data: values});
        onOpenChange(!isOpen);
    }

    const close = (): void => {
        onOpenChange(!isOpen);
    }

    return (
        <>
            <Dialog isOpen={isOpen} onDismiss={close}>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <Input {...register('name')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Task name" />
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Description
                    </label>
                    <Textarea {...register('description')} placeholder="Add task description here" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description">
                    </Textarea>
                    </div>
                    <div className="flex items-center justify-between">
                    {false ? (
                        <Spinner />
                    ) : (
                        <>
                            <button disabled={isLoading} onClick={close} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Close
                            </button>
                            <button disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Submit
                            </button>
                        </>
                    )}
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default EditTodo;