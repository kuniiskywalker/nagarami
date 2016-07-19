import React, { PropTypes } from 'react'
import { Link } from 'react-router';

let UserMenu = ({ is_logged_in, onLoginClick, onLogoutClick }) => {

    let menu;

    if(is_logged_in){
        menu = (
            <div>
                <p><a href="#" onClick={onLogoutClick}>logout</a></p>
                <p><Link to={`/subscriptions`} >my channel</Link></p>
            </div>
        )
    } else {
        menu = (
            <a href="#" onClick={onLoginClick}>login</a>
        )
    }

    return (
        <div>
            { menu }
        </div>
    )
}

UserMenu.propTypes = {
    is_logged_in: PropTypes.bool.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired
}
export default UserMenu
