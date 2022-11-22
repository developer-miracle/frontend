import React from 'react'
import { ITodoItem } from '../models'

import dayjs from 'dayjs'


interface TodoItemProps {
    todo: ITodoItem,
    index: Number
}

const styles = {
    li: {
        listStyle: 'none',
        maxWidth: '600px',
        minWidth: '400px',
        border: '1px solid rgba(0, 0, 0, .1)',
        borderRadius: '4px',
        marginBottom: '10px',
        // display: 'flex',
        // justifyContent: 'space-between',
        // padding: '20px',
        // alignItems: 'center'
        padding: '10px'
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    title: {
        fontSize: 'x-large',
        fontWeight: '600'
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
        margin: '0 10px'
    }
}

function TodoItem(props: TodoItemProps) {
    let todo = props.todo

    let day = todo.date.diff(dayjs(), 'day')




    return (
        <li style={styles.li}>
            <div style={styles.titleContainer}>
                {/* <div>{props.index.toString()}</div> */}
                <div style={styles.checkbox}>
                    <input type="checkbox" />
                    <div style={styles.title}>{todo.title}</div>
                </div>
                <div style={styles.buttons}>
                    <div style={styles.date}>Дата: {todo.date.format('DD/MM/YYYY')}</div>
                    <button style={styles.editButton}>редактировать</button>
                    <button style={styles.deleteButton}>&times;</button>
                </div>
            </div>
            <div style={styles.container as React.CSSProperties}>
                <div style={styles.text}>{todo.text}</div>
                <div >Файл: {todo.file}</div>
            </div>

        </li>
    )
}

export default TodoItem