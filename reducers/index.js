import { combineReducers } from 'redux'
import channels from './channels'
import videos from './videos'
import player from './player'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
    channels, videos, player, visibilityFilter
});
export default todoApp;
