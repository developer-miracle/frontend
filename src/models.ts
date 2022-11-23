import * as dayjs from 'dayjs'

export interface ITodoItem {
    id: Number,
    completed: Boolean,
    title: String,
    text: String,
    date: dayjs.Dayjs,
    file: String // FIXME: Заменить на ФАЙЛ
}

export interface ITodoItemArray extends Array<ITodoItem> { }

export interface AppContextInterface {
    // name: string;
    // author: string;
    // url: string;
    deleteTodo: (id: Number) => void | null
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