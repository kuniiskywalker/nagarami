import React, { PropTypes, Component } from 'react'


class DisplaySwitchButton extends Component{
    
    render(){
        const { display, onShowButton, onHideButton } = this.props

        let button;

        if(display){
            button = <button onClick={onHideButton}>To show the player</button>;
        } else {
            button = <button onClick={onShowButton}>To hide the player</button>;
        }
        
        return(
            <div>
                { button }
            </div>
        );
    }
}

DisplaySwitchButton.propTypes = {
    display: PropTypes.bool.isRequired,
    onShowButton: PropTypes.func.isRequired,
    onHideButton: PropTypes.func.isRequired
}

export default DisplaySwitchButton
