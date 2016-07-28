import React, { PropTypes } from 'react'
import VisibleToolBar from '../containers/VisibleToolBar'
import VisibleTogglePlayerButton from '../containers/VisibleTogglePlayerButton'

const Controller = ({ children }) => {
    return (
        <div>
            <div>
                <VisibleToolBar />
            </div>
            <div>
                {children}
            </div>
            <VisibleTogglePlayerButton />
        </div>
    )
}
Controller.propTypes = {
    children: PropTypes.element.isRequired
}
export default Controller
