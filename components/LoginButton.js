import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { onOpenAuthPage } = this.props;

        return <RaisedButton label="Sign in" onClick={onOpenAuthPage} />
    }
}

LoginButton.propTypes = {
    onOpenAuthPage: PropTypes.func.isRequired
}
export default LoginButton