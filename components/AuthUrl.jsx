import React, { PropTypes } from 'react'

const AuthUrl = ({ is_logged_in, onLoginClick, onLogoutClick }) => (
    <div>
        { !is_logged_in ? <a href="#" onClick={onLoginClick}>ログイン</a> : <a href="#" onClick={onLogoutClick}>ログアウト</a> }
    </div>
)

AuthUrl.propTypes = {
    is_logged_in: PropTypes.bool.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired
}
export default AuthUrl
