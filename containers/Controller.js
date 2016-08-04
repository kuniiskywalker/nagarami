import React, { PropTypes } from 'react';
import VisibleLoginDialog from './VisibleLoginDialog';
import VisibleToolBar from './VisibleToolBar';
import VisibleTogglePlayerButton from './VisibleTogglePlayerButton';

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
            <VisibleTogglePlayerButton />
        </div>
    )
}
Controller.propTypes = {
    children: PropTypes.element.isRequired
}
export default Controller
