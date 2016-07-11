import React from 'react'
import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';

let Login = ({dispatch}) => {
    let input
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(send('set-token', input.value));
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input ref={node => {
                    input = node
                }}/>
                <button type>send</button>
            </form>
        </div>
    )
}
Login = connect()(Login)
export default Login