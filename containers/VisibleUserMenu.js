import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';
import UserMenu from '../components/UserMenu'

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

const VisibleUserMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserMenu)

export default VisibleUserMenu