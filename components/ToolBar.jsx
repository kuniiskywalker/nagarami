import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';

import Popover from 'material-ui/Popover';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import AvVideoLibrary from 'material-ui/svg-icons/av/video-library';

import VisibleSearchFormKeyword from '../containers/VisibleSearchFormKeyword';

import SubscriptionMenu from '../containers/SubscriptionMenu';

class ToolBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            subscriptionOpen: false
        };
        
        // メニュータップ時の表示イベント
        this.handleTouchTap = this.handleTouchTap.bind(this);

        // メニュータップ時の非表示イベント
        this.handleRequestClose = this.handleRequestClose.bind(this);

        // メニュー選択時のイベント
        this.handleChange = this.handleChange.bind(this);

        // 登録チャンネルメニュー閉じるイベント
        this.handleCloseSubscriptionMenu = this.handleCloseSubscriptionMenu.bind(this);
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

    handleChange(event, menuItem, index) {
        event.preventDefault();
        this.setState({
            open: false,
            subscriptionOpen: true
        });
    }
    
    handleCloseSubscriptionMenu() {
        this.setState({
            open: false,
            subscriptionOpen: false
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
                        <MenuItem primaryText="登録チャンネル" leftIcon={<AvVideoLibrary />} value="subscription" />
                    </Menu>
                </Popover>
                <VisibleSubscriptionList
                    open={this.state.subscriptionOpen}
                    onCloseMenu={this.handleCloseSubscriptionMenu}
                />
            </div>
        );
    }
}

ToolBar.propTypes = {
    routerActions: PropTypes.object.isRequired
}
export default ToolBar