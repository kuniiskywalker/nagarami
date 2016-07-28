import { connect } from 'react-redux'
import TogglePlayerButton from '../components/TogglePlayerButton'
import createIpc, { send } from 'redux-electron-ipc';

function mapStateToProps(state) {
    return state.player
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleDisplay: (display) => {
            dispatch(send('toggle-player', !display));
        }
    }
}

const VisibleTogglePlayerButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(TogglePlayerButton)

export default VisibleTogglePlayerButton
