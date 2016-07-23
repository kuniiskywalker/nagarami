import React, { PropTypes } from 'react'
import PreviewPlayer from './PreviewPlayer'

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const Video = ({ id, title, thumbnail, description, onVideoPlayClick }) => (
    <ListItem
        onClick={e => {
            e.preventDefault()
            onVideoPlayClick()
        }}
        leftAvatar={<Avatar src={thumbnail} size="50" />}
        primaryText={title}
        secondaryText={description}
        secondaryTextLines={2}
    />
)

Video.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onVideoPlayClick: PropTypes.func.isRequired
}

export default Video