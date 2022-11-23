import React, { MouseEventHandler, useContext } from 'react'
import { ITodoItem } from '../models'
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
    text: {

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
    function deleteTodo(id: Number): void {
        if (deleteTodoContext) deleteTodoContext(id)
    }

    function editTodo(id: Number) {
        console.log('edit: ' + id)
    }

    const classTitle = []
    if (todo.completed) {
        classTitle.push('completed')
    }

    const classTime = []
    let millsec = todo.date.diff(dayjs())
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
                    <div className={classTime.join(' ')} style={styles.date}>Дата: {todo.date.format('DD.MM.YYYY HH:mm')}</div>
                    <button onClick={() => editTodo(todo.id)} style={styles.editButton}>редактировать</button>
                    <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>&times;</button>
                </div>
            </div>
            <div style={styles.container as React.CSSProperties}>
                <span style={styles.text}>{todo.description}</span>
                {todo.file ? <div style={styles.file}><strong>Файл:</strong> {todo.file?.name}</div> : ''}
            </div>
        </li>
    )
}

export default TodoItem