import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';
import UserMenu from '../components/UserMenu'

const mapStateToProps = (state) => {
    return state.auth
}

const mapDispatchToProps = (dispatch) => {
    return {
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

const VisibleUserMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserMenu)

export default VisibleUserMenu