import { connect } from 'react-redux';
import React, { PropTypes, Component } from 'react';
import createIpc, { send } from 'redux-electron-ipc';

import RaisedButton from 'material-ui/RaisedButton';

class TogglePlayerButton extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick (e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(send('toggle-player'));
    }
    
    render(){

        const { display } = this.props;

        const style = {
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            padding: '2px'
        };
        
        let button;

        if (display) {
            button = (
                <RaisedButton
                    onClick={this.handleClick}
                    label="Hide Player"
                    secondary={true}
                    style={style}
                />
            )
        } else {
            button = (
                <RaisedButton
                    onClick={this.handleClick}
                    label="Show Player"
                    primary={true}
                    style={style}
                />
            )
        }
        return button
    }
}

function select(state) {
    return state.player
}
export default connect(select)(TogglePlayerButton);
