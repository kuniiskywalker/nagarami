import { combineReducers } from 'redux'
import channels from './channels'
import videos from './videos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
    channels, videos, visibilityFilter
});
export default todoApp;
