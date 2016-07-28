import React from 'react'
import { connect } from 'react-redux'

import {Tabs, Tab} from 'material-ui/Tabs';

import VisibleChannelList from './VisibleChannelList'
import VisiblePlaylistList from './VisiblePlaylistList'
import VisibleVideoList from './VisibleVideoList'

class SearchList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({value: value});
    };

    render() {
        return (
            <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
            >
                <Tab label="CHANNEL" value={0}>
                    <VisibleChannelList />
                </Tab>
                <Tab label="PLAYLIST" value={1}>
                    <VisiblePlaylistList />
                </Tab>
                <Tab label="VIDEO" value={2}>
                    <VisibleVideoList />
                </Tab>
            </Tabs>
        );
    }
}
SearchList = connect()(SearchList)
export default SearchList