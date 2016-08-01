import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';

import Popover from 'material-ui/Popover';

import {List, ListItem} from 'material-ui/List';

import ActionGrade from 'material-ui/svg-icons/action/grade';
import AvVideoLibrary from 'material-ui/svg-icons/av/video-library';

import VisibleSearchFormKeyword from '../containers/VisibleSearchFormKeyword'

class ToolBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {open: false};

        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    render() {

        return (
            <div>
                <AppBar
                    title="NAGARAMI"
                    onLeftIconButtonTouchTap={this.handleTouchTap}
                    iconElementRight={<VisibleSearchFormKeyword style={{marginTop: "-20px"}} />}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                    <List>
                        <ListItem primaryText="登録チャンネル" leftIcon={<AvVideoLibrary />} />
                        <ListItem primaryText="お気に入り" leftIcon={<ActionGrade />} />
                    </List>
                </Popover>
            </div>
        );
    }
}

export default ToolBar