import React from 'react'
import PropTypes from 'prop-types'
import { ITodoItem } from '../models'
import TodoItem from './TodoItem'


interface TodoListProps {
    todos: ITodoItem[]
}

const TodoList = (props: TodoListProps) => {
    return (
        <ul>
            {props.todos.map((todo, index) => {
                return <TodoItem todo={todo} key={todo.id as React.Key} index={++index} />
            })}
        </ul>
    )
}

// TodoList.propTypes = {
//     todos: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             completed: PropTypes.bool.isRequired,
//             title: PropTypes.string.isRequired,
//             text: PropTypes.string.isRequired,
//             date: PropTypes.number.isRequired,
//             file: PropTypes.string.isRequired
//         })
//     ).isRequired
// }

export default TodoList;