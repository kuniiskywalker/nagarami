import React, { PropTypes } from 'react';
import VisibleLoginDialog from './VisibleLoginDialog';
import VisibleToolBar from './VisibleToolBar';
import TogglePlayerButton from './TogglePlayerButton';

const Controller = ({ children }) => {
    return (
        <div>
            <VisibleLoginDialog />
            <div>
                <VisibleToolBar />
            </div>
            <div>
                {children}
            </div>
            <TogglePlayerButton />
        </div>
    )
}
Controller.propTypes = {
    children: PropTypes.element.isRequired
}
export default Controller
