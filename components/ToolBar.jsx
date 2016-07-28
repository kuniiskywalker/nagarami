import React, { PropTypes, Component } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Drawer from 'material-ui/Drawer';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import LoginButton from './LoginButton.js'
import LogoutButton from './LogoutButton.js'

class ToolBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handleToggle  = this.handleToggle.bind(this);
        this.handleClose  = this.handleClose.bind(this);
    }

    componentWillMount() {
        const { fetchSubscriptions } = this.props;
        fetchSubscriptions();
    }
    
    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }
    
    render() {

        const { is_logged_in, onOpenAuthPage, onAuthToken, onLogout, subscriptions } = this.props;

        let leftElement;
        
        let rightElement;
        
        if(is_logged_in){

            leftElement = (
                <div>
                    <IconMenu
                        iconButtonElement={
                            <IconButton><MoreVertIcon /></IconButton>
                            }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <MenuItem primaryText="My channel" onClick={this.handleToggle} />
                    </IconMenu>
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <List>
                            <Subheader>My channel</Subheader>
                            {subscriptions.map((channel, i) =>
                                    <ListItem onTouchTap={this.handleClose}
                                        key={channel.id}
                                        primaryText={channel.title}
                                        leftAvatar={<Avatar src={channel.thumbnail} />}
                                    />
                            )}
                        </List>
                    </Drawer>
                </div>
            )
            
            rightElement = <LogoutButton onLogout={onLogout} />
        } else {

            leftElement = (
                <IconMenu
                    iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                        }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                </IconMenu>
            )

            rightElement = <LoginButton onOpenAuthPage={onOpenAuthPage} onAuthToken={onAuthToken} />
        }

        return (
            <AppBar
                title="NAGARAMI"
                iconElementLeft={leftElement}
                iconElementRight={rightElement}
            />
        );
    }
}

ToolBar.propTypes = {
    subscriptions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    fetchSubscriptions: PropTypes.func.isRequired,
    is_logged_in: PropTypes.bool.isRequired,
    onOpenAuthPage: PropTypes.func.isRequired,
    onAuthToken: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
}
export default ToolBar