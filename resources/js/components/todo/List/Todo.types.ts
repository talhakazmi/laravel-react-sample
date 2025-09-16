import { ReactElement } from "react";

export interface Todo {
    id: number;
    name: string;
    description: string;
    show: boolean
}

export interface EditProps {
    todo: Todo;
    isOpen: boolean;
    onOpenChange: (newState: boolean) => void; 
}

export interface Order {
    id: number;
    order: number;
};

export interface ReorderPayload {
    orders: Order[];
};

export interface SortableProps {
    item: Todo;
}