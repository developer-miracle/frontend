import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'
import { todos } from '../todos'
import Context from '../context'
import dayjs from 'dayjs'
import ModalAddTodo from './ModalAddTodo'
import utc from 'dayjs/plugin/utc'
import { ITodoItem } from '../models'

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

function Todo() {
    dayjs.extend(utc)
    dayjs.locale('ru')
    const [todoState, setTodoState] = useState(todos)
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

    function changeCompleted(id: Number): void {
        setTodoState(todoState.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }))
    }

    function appendTodo(title: string, description: string, date: dayjs.Dayjs, file: File) {
        let id = todoState.length ? todoState[todoState.length - 1].id as number + 1 : 1
        setTodoState(todoState.concat([{
            id: id,
            completed: false,
            title,
            description,
            date,
            file
        }]))
    }

    function deleteTodo(id: Number) {
        setTodoState(todoState.filter(todo => todo.id !== id))
    }

    function openModalCallback() {
        setOpenModal(true)
    }

    function closeModal() {
        setItemforEdit(undefined)
        setOpenModal(false)
    }

    function openModalEditCallback(id: Number) {
        let item = todoState.find(item => item.id === id)
        if (item) setItemforEdit(item)
        setOpenModal(true)
    }

    function editTodo(item: ITodoItem) {
        let todoArray = todoState;
        let element = todoArray.find(element => element.id === item.id)
        if (element) {
            element.title = item.title;
            element.description = item.description;
            element.date = item.date;
            element.file = item.file;
        }
        setTodoState(todoArray)
    }

    return (
        <Context.Provider value={{ editTodo, deleteTodo, appendTodo, closeModal, openModalEditCallback }}>
            <div style={styles.root as React.CSSProperties}>
                <h1>Todo</h1>
                <span>Текущее время : {dateTime?.format('DD.MM.YYYY HH:mm:ss Z')}</span>
                {openModal ? <ModalAddTodo item={itemforEdit} /> : ''}
                <button onClick={openModalCallback}>Добавить</button>
                <TodoList todos={todoState} changeCompleted={changeCompleted} />
            </div>
        </Context.Provider>
    )
}

export default Todo