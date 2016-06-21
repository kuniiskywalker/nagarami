import React from 'react'
import electron from 'electron'

// IPC通信を行う
var ipcRenderer = electron.ipcRenderer;

export default class Root extends React.Component {
    increment() {
      ipcRenderer.send("fetch-youtube-channels");
    }
    decrement() {
      ipcRenderer.send("fetch-youtube-channels");
    }
    render() {
        return (
            <div>
                <h1>Counter</h1>
                <p>{this.props.channels.length}</p>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        )
    }
}
