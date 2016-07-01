import React from 'react'
import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';

let SearchChannel = ({dispatch}) => {
    let input
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(send('search-channel', input.value));
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input ref={node => {
                    input = node
                }}/>
                <button type>search</button>
            </form>
        </div>
    )
}
SearchChannel = connect()(SearchChannel)
export default SearchChannel