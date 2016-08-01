import { connect } from 'react-redux';
import createIpc, { send } from 'redux-electron-ipc';
import LoginDialog from '../components/LoginDialog';

const mapStateToProps = (state) => {
    return state.auth
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
        }
    }
}

const VisibleLoginDialog = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginDialog)

export default VisibleLoginDialog