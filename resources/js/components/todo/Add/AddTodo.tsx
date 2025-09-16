import { ReactElement } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useAddTodo } from "./_hooks/useAddTodo";
import { Spinner, Input, Textarea } from 'react-ui';

const AddTodo = (): ReactElement => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const {mutate: addTodo, isPending: isAdding} = useAddTodo();

    const submitForm = (values: FieldValues): void => {
        addTodo({data: {name: values.name, description: values.description}});
    }

    return (
        <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit(submitForm)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                {isAdding ? (
                    <Spinner />
                ) : (
                    <button disabled={isAdding} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                )}
                </div>
            </form>
        </div>
    );
}

export default AddTodo;