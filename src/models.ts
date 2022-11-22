import * as dayjs from 'dayjs'

export interface ITodoItem {
    id: Number,
    completed: Boolean,
    title: String,
    text: String,
    date: dayjs.Dayjs,
    file: String // FIXME: Заменить на ФАЙЛ
}

interface ITodoItemArray extends Array<ITodoItem> { }