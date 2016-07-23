import React, { PropTypes, Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12
};

let DisplaySwitchButton = ({display, onShowButton, onHideButton}) => {

    let button;

    if(display){
        button = <RaisedButton onClick={onHideButton} label="Hide Player" secondary={true} style={style} />
    } else {
        button = <RaisedButton onClick={onShowButton} label="Show Player" primary={true} style={style} />
    }

    return (
        <div>
            { button }
        </div>
    )
}

DisplaySwitchButton.propTypes = {
    display: PropTypes.bool.isRequired,
    onShowButton: PropTypes.func.isRequired,
    onHideButton: PropTypes.func.isRequired
}

export default DisplaySwitchButton
