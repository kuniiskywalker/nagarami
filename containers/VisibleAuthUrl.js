import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';
import AuthUrl from '../components/AuthUrl'

const mapStateToProps = (state) => {
    return state.auth
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: () => {
            dispatch(send('open-auth-page'));
        },
        onLogoutClick: () => {
            dispatch(send('logout'));
        }
    }
}

const VisibleAuthUrl = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthUrl)

export default VisibleAuthUrl