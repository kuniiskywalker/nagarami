import React, { PropTypes } from 'react'
import DisplaySwitchButton from '../containers/VisibleDisplaySwitchButton'
import VisibleAuthUrl from '../containers/VisibleAuthUrl'
import Naviagtion from './Naviagtion'

const Controller = ({ children }) => (
    <div>
        <div>
            <DisplaySwitchButton />
            <VisibleAuthUrl />
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
