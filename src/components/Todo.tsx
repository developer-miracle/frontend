import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'
import { todos } from '../todos'
import Context from '../context'
import dayjs, { Dayjs } from 'dayjs'
import AddTodo from './AddTodo'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/ru'


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
    const [dateTime, setDateTime] = useState<dayjs.Dayjs>(dayjs)

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

    useEffect(() => {
        const interval = setInterval(
            () => setDateTime(dayjs()),
            1000
        );
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <Context.Provider value={{ deleteTodo, appendTodo }}>
            <div style={styles.root as React.CSSProperties}>
                <h1>Todo</h1>
                <span>Текущее время : {dateTime?.format('DD.MM.YYYY HH:mm:ss Z')}</span>
                <AddTodo />
                <TodoList todos={todoState} changeCompleted={changeCompleted} />
            </div>
        </Context.Provider>
    )
}

export default Todo