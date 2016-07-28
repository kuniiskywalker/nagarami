import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.login = this.login.bind(this);
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

    render() {

        const { onOpenAuthPage } = this.props;

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
                <RaisedButton label="Sign in" onClick={this.handleOpen} />
                <Dialog
                    title="Input Google Auth Code"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
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

LoginButton.propTypes = {
    onOpenAuthPage: PropTypes.func.isRequired,
    onAuthToken: PropTypes.func.isRequired
}
export default LoginButton