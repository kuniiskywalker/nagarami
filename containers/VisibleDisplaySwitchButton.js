import { connect } from 'react-redux'
import DisplaySwitchButton from '../components/DisplaySwitchButton'
import createIpc, { send } from 'redux-electron-ipc';

function mapStateToProps(state) {
    return state.player
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShowButton: () => {
            dispatch(send('show-player'));
        },
        onHideButton: () => {
            dispatch(send('hide-player'));
        }
    }
}

const VisibleDisplaySwitchButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplaySwitchButton)

export default VisibleDisplaySwitchButton
