import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

let Navigation = ({dispatch}) => {
    return (
        <ul>
            <li><Link to={`/channels`} >CHANNEl</Link></li>
            <li><Link to={`/playlist`} >PLAYLIST</Link></li>
            <li><Link to={`/videos`} >VIDEO</Link></li>
        </ul>
    )
}
Navigation = connect()(Navigation)
export default Navigation