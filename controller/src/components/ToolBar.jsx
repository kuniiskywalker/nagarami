import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';

import Popover from 'material-ui/Popover';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import ActionHome from 'material-ui/svg-icons/action/home';
import AvVideoLibrary from 'material-ui/svg-icons/av/video-library';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import VisibleSearchFormKeyword from '../containers/VisibleSearchFormKeyword';

import SubscriptionMenu from '../containers/SubscriptionMenu';
import PlaylistMenu from '../containers/PlaylistMenu';

class ToolBar extends React.Component {
    
    constructor(props) {
        super(props);
        
        // メニュータップ時の表示イベント
        this.handleTouchTap = this.handleTouchTap.bind(this);

        // メニュータップ時の非表示イベント
        this.handleRequestClose = this.handleRequestClose.bind(this);

        // メニュー選択時のイベント
        this.handleChange = this.handleChange.bind(this);

        // 登録チャンネル・登録プレイリストメニュー閉じるイベント
        this.handleCloseSubMenu = this.handleCloseSubMenu.bind(this);
    }

    // 総合メニュー開く処理
    handleTouchTap(event) {
        event.preventDefault();
        const { actions } = this.props;
        actions.openToolbar();
    }

    // 総合メニュー閉じる処理
    handleRequestClose() {
        const { actions } = this.props;
        actions.closeToolbar();
    }
    
    // 総合メニュー内のメニューアイテムクリック時の処理
    handleChange(event, menuItem, index) {
        event.preventDefault();

        const { actions } = this.props;

        const menu = menuItem.props.value;
        
        switch(menu) {
            case 'home': {
                const { routerActions } = this.props;
                routerActions.push("/");
                break;
            }
            case 'subscription': {
                // 自分のプレイリストメニューを開く用の状態
                actions.openSubscriptionToolbar();
                break;
            }
            case 'playlist': {
                // 自分のプレイリストメニューを開く用の状態
                actions.openPlaylistToolbar();
                break;
            }
        }
    }

    // チャンネルメニュー・プレイリストメニュー内のチャンネルをクリックしたときの処理
    handleCloseSubMenu() {
        const { actions } = this.props;
        actions.closeToolbar();
    }

    render() {
        const { open, subscriptionOpen, playlistOpen } = this.props;
        return (
            <div>
                <AppBar
                    title="NAGARAMI"
                    onLeftIconButtonTouchTap={this.handleTouchTap}
                    iconElementRight={<VisibleSearchFormKeyword style={{marginTop: "-20px"}} />}
                />
                <Popover
                    open={open}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                    <Menu onItemTouchTap={this.handleChange}>
                        <MenuItem primaryText="ダッシュボード" leftIcon={<ActionHome />} value="home" />
                        <MenuItem primaryText="登録チャンネル" leftIcon={<AvVideoLibrary />} value="subscription" />
                        <MenuItem primaryText="プレイリスト" leftIcon={<ActionGrade />} value="playlist" />
                    </Menu>
                </Popover>
                <SubscriptionMenu
                    open={subscriptionOpen}
                    onClickMenu={this.handleCloseSubMenu}
                />
                <PlaylistMenu
                    open={playlistOpen}
                    onClickMenu={this.handleCloseSubMenu}
                />
            </div>
        );
    }
}

ToolBar.propTypes = {
    open: PropTypes.bool.isRequired,
    subscriptionOpen: PropTypes.bool.isRequired,
    playlistOpen: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    routerActions: PropTypes.object.isRequired
}
export default ToolBar