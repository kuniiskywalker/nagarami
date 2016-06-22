import { combineReducers } from 'redux'
import channels from './channels'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
    channels, visibilityFilter
});
export default todoApp;
