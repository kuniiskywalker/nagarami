import React, { PropTypes } from 'react'
//import SearchVideo from '../containers/SearchVideo'
import Naviagtion from './Naviagtion'

const Controller = ({ children }) => (
    <div>
        <Naviagtion />
        {children}
        <Naviagtion />
    </div>
)
Controller.propTypes = {
    children: PropTypes.element.isRequired
}
export default Controller
