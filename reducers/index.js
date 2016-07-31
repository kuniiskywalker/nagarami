import { combineReducers } from 'redux'
import channels from './channels'
import playlists from './playlists'
import videos from './videos'
import player from './player'
import auth from './auth'
import subscriptions from './subscriptions'
import searchConditions from './searchConditions'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
    channels, playlists, videos, player, auth, subscriptions, searchConditions, visibilityFilter
});
export default todoApp;
