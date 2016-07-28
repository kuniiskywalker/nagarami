import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(e) {
        const { onAuthToken } = this.props;
        const code = ReactDOM.findDOMNode(this.refs.code.input).value;
        if (!code) {
            return false;
        }
        onAuthToken(code);
        this.setState({open: false});
    }

    render() {

        const { onOpenAuthPage, is_logged_in } = this.props;

        const open = is_logged_in === false? true: false;

        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.login}
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
                        onClick={(e) => {
                            e.preventDefault();
                            onOpenAuthPage()
                        }}
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
    is_logged_in: PropTypes.bool.isRequired,
    onOpenAuthPage: PropTypes.func.isRequired,
    onAuthToken: PropTypes.func.isRequired
}
export default LoginDialog