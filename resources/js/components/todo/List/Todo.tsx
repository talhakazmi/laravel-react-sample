import { ReactElement, useEffect, useState } from "react";
import { useTodoList } from "./_hooks/useTodoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faGripVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditTodo from "./_composition/EditTodo";
import type { Todo } from "./Todo.types";
import { useDeleteTodo } from "./_hooks/useDeleteTodo";

import {
  DndContext,
  closestCenter,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useReorderTodo } from "./_hooks/useReorderTodo";
import SortableTodo from "./_composition/SortableTodo";

const Todo = (): ReactElement => {
    const {data: todo, isLoading: loadingTodos} = useTodoList();
    const {mutate: deleteTodo, isPending: deletingTodos} = useDeleteTodo();
    const {mutate: reorderTodo, isPending: reorderingTodos} = useReorderTodo();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [task, setTask] = useState<Todo | undefined>(undefined);
    const [items, setItems] = useState<Todo[]>(todo ?? []);

    const setEditInfo = (todo: Todo): void => {
        setTask(todo);
        setIsEdit(true);
    }

    const onEditChange = (open: boolean): void => {
        setIsEdit(open);
        setTask(undefined)
    }

    const deleteTask = (id: number): void => {
        deleteTodo(id);
    }

    const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
        setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(prev, oldIndex, newIndex);

        reorderTodo({
            orders: {
                orders: newItems.map((item, index) => ({
                    id: item.id,
                    order: index + 1,
                })),
            }
        });

        return newItems;
        });
    }
    };

    useEffect(() => {
        if (todo) setItems(todo);
    }, [todo]);

    return (
        <>
        <h1 className="text-2xl pb-4">Tasks List</h1>
        <div className="bg-white shadow-md border rounded">
            <div className="grid grid-cols-3 gap-4 px-4 pb-4 text-lg font-semibold">
                <div>Name</div>
                <div>description</div>
                <div>Actions</div>
            </div>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                {todo !== undefined ? (
                    todo.map((item) => (
                        <SortableTodo key={item.id} item={item}>
                            <div className="grid grid-cols-3 gap-4 px-4 py-2 border-b">
                                <div key={item.id}>
                                    {item.name}
                                </div>
                                <div key={`desc_${item.id}`}>
                                    {item.description}
                                </div>
                                <div key={`action_${item.id}`}>
                                    <FontAwesomeIcon onClick={() => setEditInfo(item)} icon={faEdit}/>
                                    <FontAwesomeIcon onClick={() => deleteTask(item.id)} icon={faTrash}/>
                                </div>
                            </div>
                        </SortableTodo>
                    ))
                ) : (
                    <div>No Todo found</div>
                )}
                </SortableContext>
            </DndContext>
        </div>
        {task !== undefined && (
            <EditTodo isOpen={isEdit} todo={task} onOpenChange={onEditChange} />
        )}
        </>
    );
}

export default Todo;