import { PropsWithChildren, ReactElement } from 'react';
import { type SortableProps } from '../Todo.types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableTodo = ({item, children}: PropsWithChildren<SortableProps>): ReactElement => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div className="flex items-center">
                <span className="cursor-grab px-2 text-gray-400 py-2 border-black border-b" {...attributes} {...listeners}>
                    <FontAwesomeIcon icon={faGripVertical}/>
                </span>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}

export default SortableTodo;