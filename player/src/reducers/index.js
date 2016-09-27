import { combineReducers } from 'redux'
import player from './player'
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
    player,
    visibilityFilter
});
export default rootReducer;
