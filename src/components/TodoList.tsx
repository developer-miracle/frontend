import React from 'react'
import TodoItem from './TodoItem'
import { TodoListProps } from '../models'

const styles = {
    ul: {
        // margin: '0',
        padding: '0'
    }
}

const TodoList = (props: TodoListProps) => {
    return (
        <>
            {props.todos.length ?
                <ul style={styles.ul}>
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