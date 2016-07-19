import { connect } from 'react-redux'
import createIpc, { send } from 'redux-electron-ipc';
import SubscriptionList from '../components/SubscriptionList'

const mapStateToProps = (state) => {
    return {
        subscriptions: state.subscriptions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSubscriptions: () => {
            dispatch(send('fetch-subscriptions'));
        },
        onChannelClick: (id) => {
            dispatch(send('fetch-channel-videos', id));
        }
    }
}

const VisibleSubscriptionList = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionList)

export default VisibleSubscriptionList
