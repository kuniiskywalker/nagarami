import React from 'react'
import { Link } from 'react-router';

let Navigation = ({}) => (
    <ul>
        <li><Link to={`/channels`} >CHANNEl</Link></li>
        <li><Link to={`/playlist`} >PLAYLIST</Link></li>
        <li><Link to={`/videos`} >VIDEO</Link></li>
    </ul>
)
export default Navigation