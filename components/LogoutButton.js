import React, { PropTypes, Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    logout() {
        const { onLogout } = this.props;
        onLogout();
        this.setState({open: false});
    }

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Logout"
                primary={true}
                keyboardFocused={true}
                onClick={this.logout}
            />
        ];

        let menu = (
            <div>
                <RaisedButton label="Sign out" onClick={this.handleOpen} />
                <Dialog
                    title="Are you sure you want to logout?"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Logout from this application.
                </Dialog>
            </div>
        )

        return menu
    }
}

LogoutButton.propTypes = {
    onLogout: PropTypes.func.isRequired
}
export default LogoutButton