import React from 'react'
import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';

let OpenController = ({dispatch}) => {
    const onClick = (e) => {
        e.preventDefault()
        dispatch(send('open-controller'))
    }

    return (
        <div>
            <button type onClick={onClick}>open controller</button>
        </div>
    )
}
OpenController = connect()(OpenController)
export default OpenController