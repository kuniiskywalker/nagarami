import React, { PropTypes, Component  } from 'react'
import Subscription from './Subscription'

import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    gridList: {
        width: 500,
        height: 500,
        overflowY: 'auto',
        marginBottom: 24
    }
};

class SubscriptionList extends Component {
    constructor(props) {
        super(props);

        const { open } = props;
        
        this.state = {open: open};
    }

    componentWillMount() {
        const { fetchSubscriptions } = this.props;
        fetchSubscriptions();
    }

    render() {
        const { subscriptions, open, onCloseMenu, onSubscriptionClick } = this.props;

        return (
            <Drawer
                docked={false}
                width={200}
                open={open}
                onRequestChange={onCloseMenu}
            >
                <List>
                    {subscriptions.map((subscription, i) =>
                        <Subscription
                            key={subscription.id}
                            {...subscription}
                            handleSubscriptionClick={() => {
                                onSubscriptionClick(subscription.id);
                                onCloseMenu();
                            }}
                        />
                    )}
                </List>
            </Drawer>
        );
    }
}

SubscriptionList.propTypes = {
    subscriptions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    open: PropTypes.bool.isRequired,
    fetchSubscriptions: PropTypes.func.isRequired,
    onSubscriptionClick: PropTypes.func.isRequired,
    onCloseMenu: PropTypes.func.isRequired
}
export default SubscriptionList
