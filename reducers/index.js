// import { combineReducers } from 'redux'
// import channels from './channels'
//
// const rootReducer = combineReducers({
//     channels
// });
//
// export default rootReducer;


import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
const todoApp = combineReducers({
　todos, visibilityFilter })
export default todoApp
