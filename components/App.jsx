import React from 'react'
import VisiblePlayer from '../containers/VisiblePlayer'
import VisibleChannelList from '../containers/VisibleChannelList'
import VisibleVideoList from '../containers/VisibleVideoList'

const App = () => (
    <div>
        <VisiblePlayer />
        <VisibleChannelList />
        <VisibleVideoList />
    </div>
)
export default App
