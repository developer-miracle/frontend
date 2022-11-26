/**
 * @module TODO
 */
import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'
import { todos } from '../todos'
import Context from '../context'
import dayjs from 'dayjs'
import ModalTodo from './ModalTodo'
import utc from 'dayjs/plugin/utc'
import { ITodoItem } from '../models'

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: '#CCFFCC',
        border: 0,
        borderRadius: '4px',
        color: '#000',
        width: '200px',
        height: '40px'
    },
    timeContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
}
/**
 * @category Component
 */
function Todo() {
    /**
     * Объявление чего-то там
     */
    dayjs.extend(utc)
    dayjs.locale('ru')

    const [todosState, setTodosState] = useState(todos)
    const [openModal, setOpenModal] = useState(false)
    const [dateTime, setDateTime] = useState<dayjs.Dayjs>(dayjs)
    const [itemforEdit, setItemforEdit] = useState<ITodoItem>()

    useEffect(() => {
        const interval = setInterval(
            () => setDateTime(dayjs()),
            1000
        );
        return () => {
            clearInterval(interval)
        }
    }, [])

    /**
     * @description Функция изменяет поле completed в массиве todosState
     * @param {Number} id - Ид изменяемой задачи
     */
    function changeCompleted(id: Number): void {
        setTodosState(todosState.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }))
    }

    /**
     * @description Функция добавляет новую задачу в массив todosState
     * @param {string} title - Название задачи
     * @param {string} description - Описание задачи
     * @param {Dayjs} date - Дата выполнения задачи
     * @param {File} file - Файл прикрепленный к задаче
     */
    function appendTodo(title: string, description: string, date: dayjs.Dayjs, file: File) {
        let id = todosState.length ? todosState[todosState.length - 1].id as number + 1 : 1
        setTodosState(todosState.concat([{
            id: id,
            completed: false,
            title,
            description,
            date,
            file
        }]))
    }

    /**
     * @description Функция удаляет задачу из массива todosState
     * @param {Number} id - Ид удаляемой задачи
     */
    function deleteTodo(id: Number) {
        setTodosState(todosState.filter(todo => todo.id !== id))
    }

    /**
     * @description Функция открывает модальное окно
     */
    function openModalCallback() {
        setOpenModal(true)
    }

    /**
     * @description Функция закрывает модальное окно
     */
    function closeModal() {
        setItemforEdit(undefined) // FIXME: перенести в другое место
        setOpenModal(false)
    }

    /**
     * @description Функция открывает модальное окно для редактирования задачи
     * @param {Number} id - Ид редактируемой задачи
     */
    function openModalEditCallback(id: Number) {
        let item = todosState.find(item => item.id === id)
        if (item) setItemforEdit(item)
        setOpenModal(true)
    }

    /**
     * @description Функция изменяет существующую задачу из массива todosState
     * @param {ITodoItem} item - Новый объект для замены
     */
    function editTodo(item: ITodoItem) {
        let todoArray = todosState;
        let element = todoArray.find(element => element.id === item.id)
        if (element) {
            element.title = item.title;
            element.description = item.description;
            element.date = item.date;
            element.file = item.file;
        }
        setTodosState(todoArray)
    }

    return (
        <Context.Provider value={{ editTodo, deleteTodo, appendTodo, closeModal, openModalEditCallback }}>
            <div style={styles.container as React.CSSProperties}>
                <div style={styles.root as React.CSSProperties}>
                    <h1>Todo</h1>
                    <div style={styles.ButtonContainer as React.CSSProperties}>
                        <div style={styles.timeContainer as React.CSSProperties}>
                            <span><strong>Текущее время :</strong></span>
                            <span>{dateTime?.format('DD.MM.YYYY HH:mm:ss Z')}</span>
                        </div>
                        <button style={styles.button} onClick={openModalCallback}>Добавить</button>
                    </div>
                    <TodoList todos={todosState} changeCompleted={changeCompleted} />
                    {openModal ? <ModalTodo item={itemforEdit} /> : ''}
                </div>
            </div>
        </Context.Provider >
    )
}

export default Todo