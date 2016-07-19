import React, { PropTypes, Component  } from 'react'
import Channel from './Channel'

class SubscriptionList extends Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        const { fetchSubscriptions } = this.props;
        fetchSubscriptions();
    }
    
    componentWillUpdate(){
    }
    
    componentWillUnmount() {
    }

    render() {
        const { subscriptions, onChannelClick } = this.props;

        return (
            <div>
                <ul>
                    {subscriptions.map((channel, i) =>
                    <Channel
                        key={channel.id}
                    {...channel}
                        onClick={() => onChannelClick(channel.id)}
                    />
                    )}
                </ul>
            </div>
        );
    }
}

SubscriptionList.propTypes = {
    subscriptions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    fetchSubscriptions: PropTypes.func.isRequired,
    onChannelClick: PropTypes.func.isRequired
}
export default SubscriptionList
