import dayjs from 'dayjs'

export interface ITodoItem {
    id: Number,
    completed: Boolean,
    title: string,
    description: string,
    date: dayjs.Dayjs,
    file: File | null // FIXME: Заменить на ФАЙЛ
}

export interface ITodoItemArray extends Array<ITodoItem> { }

export interface AppContextInterface {
    // name: string;
    // author: string;
    // url: string;
    deleteTodo: (id: Number) => void | null;
    appendTodo: (title: string, decription: string, date: dayjs.Dayjs, file: File) => void | null;

}

export interface TodoItemProps {
    todo: ITodoItem,
    index: Number,
    changeCompleted: (id: Number) => void
}

export interface TodoListProps {
    todos: ITodoItem[],
    changeCompleted: (id: Number) => void
}