import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleAuthenticationSubmit = this.handleAuthenticationSubmit.bind(this);
    }
    
    handleLoginSubmit(e) {
        const { onAuthToken } = this.props;
        const code = ReactDOM.findDOMNode(this.refs.code.input).value;
        if (!code) {
            return false;
        }
        onAuthToken(code);
        this.setState({open: false});
    }

    handleAuthenticationSubmit(e) {
        e.preventDefault();
        const { onOpenAuthPage } = this.props;
        onOpenAuthPage()
    }
    
    render() {

        const { isLoggedIn } = this.props;

        const open = isLoggedIn === false? true: false;

        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleLoginSubmit}
            />
        ];

        let menu = (
            <div>
                <Dialog
                    title="Input Google Auth Code"
                    actions={actions}
                    modal={false}
                    open={open}
                >
                    Please input google auth code.
                    <FlatButton
                        label="get code!"
                        secondary={true}
                        onClick={this.handleAuthenticationSubmit}
                    />
                    <TextField
                        hintText="code"
                        ref="code"
                    />
                </Dialog>
            </div>
        )

        return menu
    }
}

LoginDialog.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onOpenAuthPage: PropTypes.func.isRequired,
    onAuthToken: PropTypes.func.isRequired
}
export default LoginDialog