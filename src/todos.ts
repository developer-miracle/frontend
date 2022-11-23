import { ITodoItem } from './models'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

export const todos: ITodoItem[] = [
    {
        id: 1,
        completed: false,
        title: 'Купить стол',
        description: 'Стол продается в другом конце города',
        date: dayjs('2022-11-24 3:00'),
        file: null
    },
    {
        id: 2,
        completed: false,
        title: 'Купить лампу',
        description: 'Лампа продается в магазине через дорогу',
        date: dayjs('2022-11-24 2:00'),
        file: null
    }
]