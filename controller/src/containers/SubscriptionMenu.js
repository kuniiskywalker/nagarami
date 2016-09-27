import { connect } from 'react-redux';
import createIpc, { send } from 'redux-electron-ipc';

import SubscriptionList from '../components/SubscriptionList';

import { setSearchChannelId } from '../actions';

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
            dispatch(setSearchChannelId(channelId));
            dispatch(send('search-video', {
                channelId: channelId,
                sort: "date"
            }));
        }
    }
}

const SubscriptionMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionList)

export default SubscriptionMenu
