import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
function getVisibleTodos(todos, filter) {
　switch (filter) {
　case 'SHOW_ALL':
return todos
　case 'SHOW_COMPLETED':
return todos.filter(todo => todo.completed)
　case 'SHOW_ACTIVE':
return todos.filter(todo => !todo.completed)
　}
}
function mapStateToProps(state) {
return { todos: getVisibleTodos(
state.todos, state.visibilityFilter) }
}
const VisibleTodoList = connect(mapStateToProps)(TodoList)
export default VisibleTodoList
