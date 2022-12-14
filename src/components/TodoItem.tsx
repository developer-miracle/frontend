import React, { useContext } from 'react'
import dayjs from 'dayjs'
import './TodoItem.css'
import Context from '../context'
import { AppContextInterface, TodoItemProps } from '../models'

const styles = {
    li: {
        listStyle: 'none',
        maxWidth: '600px',
        minWidth: '400px',
        border: '1px solid rgba(0, 0, 0, .1)',
        borderRadius: '4px',
        marginBottom: '10px',
        padding: '10px'
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 'x-large',
        fontWeight: '600',
        userSelect: 'none'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',

    },
    editButton: {
        backgroundColor: '#ccc',
        border: 0,
        borderRadius: '4px',
        color: '#fff',
        marginRight: '10px',
    },
    deleteButton: {
        backgroundColor: '#DE8383',
        border: 0,
        borderRadius: '4px',
        color: '#fff'
    },
    checkbox: {
        display: 'flex'
    },
    buttons: {
        display: 'flex'
    },
    date: {
        margin: '0 10px',
        color: 'green'
    },
    file: {
        margin: '10px 0'
    }
}

function TodoItem(props: TodoItemProps) {
    let todo = props.todo
    const deleteTodoContext = useContext<AppContextInterface | null>(Context)?.deleteTodo
    const openModalEditCallbackContext = useContext<AppContextInterface | null>(Context)?.openModalEditCallback
    function deleteTodo(id: Number): void {
        deleteTodoContext && deleteTodoContext(id)
    }

    function editTodo(id: Number) {
        openModalEditCallbackContext?.(id)
    }

    const classTitle = []
    if (todo.completed) {
        classTitle.push('completed')
    }

    const classTime = []
    if (todo.date.diff(dayjs()) <= 0 && todo.completed !== true) {
        classTime.push('time-is-up')
    }

    return (
        <li style={styles.li}>
            <div style={styles.titleContainer}>
                <div style={styles.checkbox}>
                    <input type="checkbox" checked={todo.completed as boolean} onChange={() => props.changeCompleted(todo.id)} />
                    <div onClick={() => props.changeCompleted(todo.id)} className={classTitle.join(' ')} style={styles.title as React.CSSProperties}>{todo.title}</div>
                </div>
                <div style={styles.buttons}>
                    <div className={classTime.join(' ')} style={styles.date}>????????: {todo.date.format('DD.MM.YYYY HH:mm')}</div>
                    <button onClick={() => editTodo(todo.id)} style={styles.editButton}>??????????????????????????</button>
                    <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>&times;</button>
                </div>
            </div>
            <div style={styles.container as React.CSSProperties}>
                <span>{todo.description}</span>
                {todo.file ?
                    <a href={window.URL.createObjectURL(todo.file)} download={todo.file.name}>
                        <div style={styles.file}><strong>????????:</strong> {todo.file?.name}</div>
                    </a>
                    : ''}

            </div>
        </li>
    )
}

export default TodoItem