import React from 'react'
import SearchVideo from '../containers/SearchVideo'
import VisibleChannelList from '../containers/VisibleChannelList'
import VisibleVideoList from '../containers/VisibleVideoList'
import {Tabs, TabLink, TabContent} from 'react-tabs-redux'

const ControllerApp = () => (
    <div>
        <Tabs>
            <TabLink to="tab1">キーワード検索</TabLink>
            <TabLink to="tab2">チャンネルリスト</TabLink>

            <TabContent for="tab1"><SearchVideo /></TabContent>
            <TabContent for="tab2"><VisibleChannelList /></TabContent>
        </Tabs>

        <VisibleVideoList />
    </div>
)
export default ControllerApp
