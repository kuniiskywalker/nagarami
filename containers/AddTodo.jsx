import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
let AddTodo = ({dispatch}) => {
　let input
　const onSubmit = (e) => {
e.preventDefault()
dispatch(addTodo(input.value))
input.value = ''
　}
　　
return (
<div>
<form onSubmit={onSubmit}>
<input ref={node => {input = node}}/>
<button type>Add Todo</button>
</form>
</div>
　)
}
AddTodo = connect()(AddTodo)
export default AddTodo
