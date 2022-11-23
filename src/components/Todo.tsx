import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'
import { todos } from '../todos'
import Context from '../context'

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    formContainer: {

    }
}

function submitForm(event: React.FormEvent) {
    event.preventDefault()
    console.log('event')
}



function Todo() {
    const [todoState, setTodoState] = useState(todos)
    const [file, setFile] = useState<File | null>();
    const [img, setImg] = useState(<></>);

    function changeCompleted(id: Number): void {
        setTodoState(todoState.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }))
    }

    // useEffect(() => {
    //     console.log(file)
    //     setImg(<img src={file?.name as string} />)
    // }, [file])

    function deleteTodo(id: Number) {
        setTodoState(todoState.filter(todo => todo.id !== id))
    }

    return (
        <Context.Provider value={{ deleteTodo }}>
            <div style={styles.root as React.CSSProperties}>
                <h1>Todo</h1>
                <form onSubmit={submitForm} style={styles.formContainer}>
                    <div style={styles.inputContainer as React.CSSProperties}>
                        <input type="text" />
                        <input type="text" />
                        <input type="file" onChange={(event) => {
                            setFile(event.currentTarget.files?.item(0))
                        }} />
                    </div>
                    <button type="submit">Подтвердить</button>
                </form>
                <TodoList todos={todoState} changeCompleted={changeCompleted} />
            </div>
        </Context.Provider>

    )
}

export default Todo