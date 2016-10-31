import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import createIpc, { send } from 'redux-electron-ipc';
import { routerActions } from 'react-router-redux';

import ToolBar from '../components/ToolBar';

import * as Actions from '../actions';

const mapStateToProps = (state) => {
    return state.toolbar
}

const mapDispatchToProps = (dispatch) => {
    return {
        //onOpenAuthPage: () => {
        //    dispatch(send('open-auth-page'));
        //},
        //onLogout: () => {
        //    dispatch(send('logout'));
        //},
        actions: bindActionCreators(Actions, dispatch),
        routerActions: bindActionCreators( Object.assign({}, routerActions), dispatch)
    }
}

const VisibleToolBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolBar)

export default VisibleToolBar