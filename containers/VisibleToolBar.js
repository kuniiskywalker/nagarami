import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';
import ToolBar from '../components/ToolBar'

const mapStateToProps = (state) => {
    return Object.assign({}, state.auth, {
        subscriptions: state.subscriptions
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSubscriptions: () => {
            dispatch(send('fetch-subscriptions'));
        },
        onOpenAuthPage: () => {
            dispatch(send('open-auth-page'));
        },
        onAuthToken: (code) => {
            dispatch(send('set-token', code));
        },
        onLogout: () => {
            dispatch(send('logout'));
        }
    }
}

const VisibleToolBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolBar)

export default VisibleToolBar