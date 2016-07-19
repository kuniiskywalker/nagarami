import React, { PropTypes } from 'react'
import DisplaySwitchButton from '../containers/VisibleDisplaySwitchButton'
import VisibleUserMenu from '../containers/VisibleUserMenu'
import Naviagtion from './Naviagtion'

const Controller = ({ children }) => (
    <div>
        <div>
            <DisplaySwitchButton />
            <VisibleUserMenu />
        </div>
        <Naviagtion />
        {children}
        <Naviagtion />
    </div>
)
Controller.propTypes = {
    children: PropTypes.element.isRequired
}
export default Controller
