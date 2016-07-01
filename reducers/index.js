import { combineReducers } from 'redux'
import channels from './channels'
import playlists from './playlists'
import videos from './videos'
import player from './player'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
    channels, playlists, videos, player, visibilityFilter
});
export default todoApp;
