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
        this.handleClickSubscriptionMenu = this.handleClickSubscriptionMenu.bind(this);

        // 登録プレイリストメニュー閉じるイベント
        this.handleClickPlaylistMenu = this.handleClickPlaylistMenu.bind(this);
    }

    // 総合メニュー開く処理
    handleTouchTap(event) {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    }

    // 総合メニュー閉じる処理
    handleRequestClose() {
        this.setState({
            open: false
        });
    }
    
    // 総合メニュー内のメニューアイテムクリック時の処理
    handleChange(event, menuItem, index) {
        event.preventDefault();
        
        const menu = menuItem.props.value;
        
        // サイドメニュー自体の閉じた状態に遷移
        this.setState({open: false});
        
        switch(menu) {
            case 'home': {
                const { routerActions } = this.props;
                routerActions.push("/");
                break;
            }
            case 'subscription': {
                // 自分のプレイリストメニューを開く用の状態
                this.setState({subscriptionOpen: true});
                break;
            }
            case 'playlist': {
                // 自分のプレイリストメニューを開く用の状態
                this.setState({playlistOpen: true});
                break;
            }
        }
    }

    // チャンネルメニュー内のチャンネルをクリックしたときの処理
    handleClickSubscriptionMenu() {
        this.setState({
            open: false,
            subscriptionOpen: false
        });
    }

    // プレイリストメニュー内のプレイリストをクリックしたときの処理
    handleClickPlaylistMenu() {
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
                        <MenuItem primaryText="ダッシュボード" leftIcon={<ActionHome />} value="home" />
                        <MenuItem primaryText="登録チャンネル" leftIcon={<AvVideoLibrary />} value="subscription" />
                        <MenuItem primaryText="プレイリスト" leftIcon={<ActionGrade />} value="playlist" />
                    </Menu>
                </Popover>
                <SubscriptionMenu
                    open={this.state.subscriptionOpen}
                    onClickMenu={this.handleClickSubscriptionMenu}
                />
                <PlaylistMenu
                    open={this.state.playlistOpen}
                    onClickMenu={this.handleClickPlaylistMenu}
                />
            </div>
        );
    }
}

ToolBar.propTypes = {
    routerActions: PropTypes.object.isRequired
}
export default ToolBar