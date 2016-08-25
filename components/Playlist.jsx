import React, { PropTypes } from 'react'

import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import ListItem from 'material-ui/List/ListItem';

const Playlist = ({ title, thumbnail, onPlaylistClick }) => (
    <ListItem
        disabled={true}
        onClick={onPlaylistClick}
        leftAvatar={
            <Avatar src={thumbnail} />
            }
    >
        {title}
    </ListItem>
)

Playlist.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    onPlaylistClick: PropTypes.func.isRequired
}

export default Playlist