import React, { PropTypes } from 'react'
import AuthUrl from './AuthUrl'
import Naviagtion from './Naviagtion'

const Controller = ({ children }) => (
    <div>
        <div>
            <AuthUrl />
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
