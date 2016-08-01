import { connect } from 'react-redux';
import createIpc, { send } from 'redux-electron-ipc';
import ToolBar from '../components/ToolBar';

const mapStateToProps = (state) => {
    return state.auth
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOpenAuthPage: () => {
            dispatch(send('open-auth-page'));
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