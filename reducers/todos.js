function todos(state = [], action) {
　switch(action.type) {
　case 'ADD_TODO':
return [
...state,
{ text: action.text, completed: false }
]
　case 'COMPLETE_TODO':
　default:
return state
　}
}
export default todos
