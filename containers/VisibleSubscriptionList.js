import { connect } from 'react-redux';
import createIpc, { send } from 'redux-electron-ipc';

import SubscriptionList from '../components/SubscriptionList';

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
        onSubscriptionClick: (channelId) => {
            if (!channelId) {
                return false;
            }
            dispatch(send('fetch-channel-video', {
                channelId: channelId,
                sort: "date"
            }));
        }
    }
}

const VisibleSubscriptionList = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionList)

export default VisibleSubscriptionList
