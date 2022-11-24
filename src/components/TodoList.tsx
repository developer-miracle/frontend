import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ITodoItem } from '../models'
import TodoItem from './TodoItem'
import { TodoListProps } from '../models'
import dayjs from 'dayjs'

const TodoList = (props: TodoListProps) => {

    const [dateTime, setDateTime] = useState<dayjs.Dayjs>(dayjs)
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
        <>
            {props.todos.length ?
                <ul>
                    {props.todos.map((todo, index) => {
                        return <TodoItem
                            todo={todo}
                            key={todo.id as React.Key}
                            index={++index}
                            changeCompleted={props.changeCompleted}
                        />
                    })}

                </ul>
                :
                <span>Список пуст</span>
            }
        </>
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