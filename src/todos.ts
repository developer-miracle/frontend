import { ITodoItem } from './models'
import dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear'
import 'dayjs/locale/ru'

export const todos: ITodoItem[] = [
    {
        id: 1,
        completed: true,
        title: 'Купить стол',
        text: 'Стол продается в другом конце города',
        date: dayjs('2022-12-31').locale('ru'),
        file: 'file1' // FIXME: Заменить на ФАЙЛ
    },
    {
        id: 2,
        completed: false,
        title: 'Купить лампу',
        text: 'Лампа продается в магазине через дорогу',
        date: dayjs('2022-11-24').locale('ru'),
        file: 'file2' // FIXME: Заменить на ФАЙЛ
    }
]