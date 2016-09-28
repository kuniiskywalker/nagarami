import React, { PropTypes, Component  } from 'react'
import Playlist from './Playlist'

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

class PlaylistList extends Component {
    constructor(props) {
        super(props);

        const { open } = props;
        
        this.state = {open: open};

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        const { fetchPlaylists } = this.props;
        fetchPlaylists();
    }
    
    handleClick(playlistId) {
        const { onClickMenu, onPlaylistClick } = this.props;
        onPlaylistClick(playlistId);
        onClickMenu();
    }
    
    render() {
        const { playlists, open, onClickMenu } = this.props;

        return (
            <Drawer
                docked={false}
                width={200}
                open={open}
                onRequestChange={onClickMenu}
            >
                <List>
                    {playlists.map((playlist, i) =>
                        <Playlist
                            key={playlist.id}
                            {...playlist}
                            onPlaylistClick={() => this.handleClick(playlist.id)}
                        />
                    )}
                </List>
            </Drawer>
        );
    }
}

PlaylistList.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired).isRequired,
    open: PropTypes.bool.isRequired,
    fetchPlaylists: PropTypes.func.isRequired,
    onPlaylistClick: PropTypes.func.isRequired,
    onClickMenu: PropTypes.func.isRequired
}
export default PlaylistList
