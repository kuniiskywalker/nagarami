import { connect } from 'react-redux';
import Player from '../components/Player';

function mapStateToProps(state) {
    return state.player
}

const VisiblePlayer = connect(mapStateToProps)(Player)

export default VisiblePlayer
