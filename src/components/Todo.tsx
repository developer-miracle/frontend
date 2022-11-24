import React, { useState } from 'react'
import TodoList from './TodoList'
import { todos } from '../todos'
import Context from '../context'
import AddTodo from './AddTodo'
import dayjs from 'dayjs'
import RealTime from './RealTime'


const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

function Todo() {
    const [todoState, setTodoState] = useState(todos)

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



    return (
        <Context.Provider value={{ deleteTodo, appendTodo }}>
            <div style={styles.root as React.CSSProperties}>
                <h1>Todo</h1>
                <RealTime />
                <AddTodo />
                <TodoList todos={todoState} changeCompleted={changeCompleted} />
            </div>
        </Context.Provider>
    )
}

export default Todo