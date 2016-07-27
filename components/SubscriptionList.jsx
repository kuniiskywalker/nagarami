import React, { PropTypes, Component  } from 'react'
import Channel from './Channel'

import {GridList, GridTile} from 'material-ui/GridList';

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
            <div style={styles.root}>
                <GridList
                    cellHeight={200}
                    style={styles.gridList}
                >
                    {subscriptions.map((channel, i) =>
                    <Channel
                        key={channel.id}
                        {...channel}
                        onClick={() => onChannelClick(channel.id)}
                    />
                    )}
                </GridList>
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
