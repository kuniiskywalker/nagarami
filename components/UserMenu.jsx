import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }
    
    login(e) {
        const { onAuthToken } = this.props;
        const code = ReactDOM.findDOMNode(this.refs.code.input).value;
        onAuthToken(code);
        this.setState({open: false});
    }

    logout() {
        const { onLogout } = this.props;
        onLogout();
        this.setState({open: false});
    }
    
    render() {

        const { is_logged_in, onOpenAuthPage } = this.props;

        let menu;

        if(is_logged_in){
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
            
            menu = (
                <div>
                    <RaisedButton label="LOGOUT" onClick={this.handleOpen} />
                    <Dialog
                        title="Are you sure you want to logout?"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Logout from this application.
                    </Dialog>
                    <p><Link to={`/subscriptions`} >MY CHANNEL</Link></p>
                </div>
            )
        } else {
            const actions = [
                <FlatButton
                    label="Ok"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.login}
                />
            ];

            menu = (
                <div>
                    <RaisedButton label="LOGIN" onClick={this.handleOpen} />
                    <Dialog
                        title="Input Google Auth Code"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Please input google auth code.
                        <a href="#" onClick={onOpenAuthPage}>get code!</a>
                        <TextField
                            hintText="code"
                            ref="code"
                        />
                    </Dialog>
                </div>
            )
        }

        return (
            <div>
            { menu }
            </div>
        );
    }
}

UserMenu.propTypes = {
    is_logged_in: PropTypes.bool.isRequired,
    onOpenAuthPage: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onAuthToken: PropTypes.func.isRequired
}
export default UserMenu