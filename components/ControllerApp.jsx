import React from 'react'
import SearchVideo from '../containers/SearchVideo'
import VisibleChannelList from '../containers/VisibleChannelList'
import VisibleVideoList from '../containers/VisibleVideoList'

const ControllerApp = () => (
    <div>
        <SearchVideo />
        <VisibleChannelList />
        <VisibleVideoList />
    </div>
)
export default ControllerApp
