import React, { PropTypes } from 'react'

const DisplaySwitchButton = ({ display, onShowButton, onHideButton }) => (
    <div>
        { !display ? <button onClick={onShowButton}>To show the player</button> : null }
        { display ? <button onClick={onHideButton}>To hide the player</button> : null }
    </div>
)

DisplaySwitchButton.propTypes = {
    display: PropTypes.bool.isRequired,
    onShowButton: PropTypes.func.isRequired,
    onHideButton: PropTypes.func.isRequired
}

export default DisplaySwitchButton
