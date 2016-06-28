import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';
//import createIpc, { send } from 'redux-electron-ipc';

let Navigation = ({dispatch}) => {
    return (
        <ul>
            <li><Link to={`/videos`} >動画一覧</Link></li>
            <li><Link to={`/channels`} >チャンネル一覧</Link></li>
        </ul>
    )
}
Navigation = connect()(Navigation)
export default Navigation