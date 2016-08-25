import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';

import Popover from 'material-ui/Popover';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import AvVideoLibrary from 'material-ui/svg-icons/av/video-library';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import VisibleSearchFormKeyword from '../containers/VisibleSearchFormKeyword';

import SubscriptionMenu from '../containers/SubscriptionMenu';
import PlaylistMenu from '../containers/PlaylistMenu';

class ToolBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            subscriptionOpen: false,
            playlistOpen: false
        };
        
        // メニュータップ時の表示イベント
        this.handleTouchTap = this.handleTouchTap.bind(this);

        // メニュータップ時の非表示イベント
        this.handleRequestClose = this.handleRequestClose.bind(this);

        // メニュー選択時のイベント
        this.handleChange = this.handleChange.bind(this);

        // 登録チャンネルメニュー閉じるイベント
        this.handleCloseSubscriptionMenu = this.handleCloseSubscriptionMenu.bind(this);

        // 登録プレイリストメニュー閉じるイベント
        this.handleClosePlaylistMenu = this.handleClosePlaylistMenu.bind(this);
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
        const menu = menuItem.props.value;
        let params = {open: false};
        switch(menu) {
            case 'subscription': {
                params['subscriptionOpen'] = true;
                break;
            }
            case 'playlist': {
                params['playlistOpen'] = true;
                break;
            }
        }
        this.setState(params);
    }
    
    handleCloseSubscriptionMenu() {
        this.setState({
            open: false,
            subscriptionOpen: false
        });
    }

    handleClosePlaylistMenu() {
        this.setState({
            open: false,
            playlistOpen: false
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
                        <MenuItem primaryText="プレイリスト" leftIcon={<ActionGrade />} value="playlist" />
                    </Menu>
                </Popover>
                <SubscriptionMenu
                    open={this.state.subscriptionOpen}
                    onCloseMenu={this.handleCloseSubscriptionMenu}
                />
                <PlaylistMenu
                    open={this.state.playlistOpen}
                    onCloseMenu={this.handleClosePlaylistMenu}
                />
            </div>
        );
    }
}

ToolBar.propTypes = {
    routerActions: PropTypes.object.isRequired
}
export default ToolBar