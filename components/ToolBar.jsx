import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';

import Popover from 'material-ui/Popover';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

//import {List, ListItem} from 'material-ui/List';

import ActionHome from 'material-ui/svg-icons/action/home';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import AvVideoLibrary from 'material-ui/svg-icons/av/video-library';

import VisibleSearchFormKeyword from '../containers/VisibleSearchFormKeyword'

class ToolBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {open: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleChange(event, menuItem, index) {
        event.preventDefault();
        const route = menuItem.props.value;
        this.props.routerActions.push(route);
        this.setState({
            open: false
        });
    }
    
    handleTouchTap(event) {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    }

    handleRequestClose() {
        this.setState({
            open: false
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
                    <Menu onItemTouchTap={this.handleChange}>
                        <MenuItem primaryText="ダッシュボード" leftIcon={<ActionHome />} value="home" />
                        <MenuItem primaryText="登録チャンネル" leftIcon={<AvVideoLibrary />} value="channel" />
                        <MenuItem primaryText="プレイリスト" leftIcon={<ActionGrade />} value="playlist" />
                    </Menu>
                </Popover>
            </div>
        );
    }
}

ToolBar.propTypes = {
    routerActions: PropTypes.object.isRequired
}
export default ToolBar