import React from 'react'
import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';

let SearchVideo = ({dispatch}) => {
    let input
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(send('search-videos', input.value));
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
SearchVideo = connect()(SearchVideo)
export default SearchVideo