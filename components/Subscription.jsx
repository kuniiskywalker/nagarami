import React, { PropTypes } from 'react'

import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import ListItem from 'material-ui/List/ListItem';

const Subscription = ({ title, thumbnail, onSubscriptionClick }) => (
    <ListItem
        disabled={true}
        onClick={onSubscriptionClick}
        leftAvatar={
            <Avatar src={thumbnail} />
            }
    >
        {title}
    </ListItem>
)

Subscription.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    onSubscriptionClick: PropTypes.func.isRequired
}

export default Subscription