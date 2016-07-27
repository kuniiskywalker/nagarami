import React, { PropTypes } from 'react'
import VisibleTogglePlayerButton from '../containers/VisibleTogglePlayerButton'
import VisibleUserMenu from '../containers/VisibleUserMenu'
import Naviagtion from './Naviagtion'

const Controller = ({ children }) => (
    <div>
        <div>
            <VisibleTogglePlayerButton />
            <VisibleUserMenu />
        </div>
        <Naviagtion />
        {children}
    </div>
)
Controller.propTypes = {
    children: PropTypes.element.isRequired
}
export default Controller
