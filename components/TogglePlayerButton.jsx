import React, { PropTypes, Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';

const style = {
	position: 'fixed',
	bottom: '10px',
	right: '10px',
	padding: '2px'
};

let TogglePlayerButton = ({display, onToggleDisplay}) => {

    let button;

    if(display){
        button = (
	    <RaisedButton
	        onClick={e => {
		   e.preventDefault(); 
                   onToggleDisplay(display);
		}}
		label="Hide Player"
		secondary={true}
		style={style}
	    />
	)
    } else {
        button = (
	    <RaisedButton
	        onClick={e => {
		   e.preventDefault(); 
                   onToggleDisplay(display);
		}}
		label="Show Player"
		primary={true}
		style={style}
	    />
	)
    }

    return (
        <div>
            { button }
        </div>
    )
}

TogglePlayerButton.propTypes = {
    display: PropTypes.bool.isRequired,
    onToggleDisplay: PropTypes.func.isRequired
}

export default TogglePlayerButton
