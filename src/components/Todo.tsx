import TodoList from './TodoList'
import { todos } from '../todos'

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

function Todo() {



    return (
        <div style={styles.root as React.CSSProperties}>
            <h1>Todo</h1>
            <TodoList todos={todos} />
        </div>
    )
}

export default Todo