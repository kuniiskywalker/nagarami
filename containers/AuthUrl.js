import React from 'react'
import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';

let AuthUrl = ({dispatch}) => {
    const onButtonClick = (e) => {
        e.preventDefault();
        dispatch(send('open-auth-page'));
    }

    return (
        <div>
            <a href="#" onClick={onButtonClick}>ログイン</a>
        </div>
    )
}
AuthUrl = connect()(AuthUrl)
export default AuthUrl