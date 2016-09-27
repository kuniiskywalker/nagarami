import React, { PropTypes } from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';

import numeral from 'numeral';

import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';

import {black, white} from 'material-ui/styles/colors';

const styles = {
    viewCounter: {
        marginTop: "10px",
        //backgroundColor: black,
        fontSize: 12
    },
    upDown: {
        container: {
            display: "flex",
            justifyContent: "flex-end"
        },
        item: {
            marginRight: 10
        },
        icon: {
            marginRight: 5,
            width: 13,
            height: 13,
            paddingTop: 2
        }
    }
};

const Video = ({ id, title, thumbnail, description, viewCount, likeCount, dislikeCount, onPlayVideoClick, onStartPreviewVideoHover, onStopPreviewVideoHover }) => {
    const subtitle = (
        <div>
            <div style={styles.viewCounter}>視聴回数 {numeral(viewCount).format('0,0')} 回</div>
            <Divider />
            <div style={styles.upDown.container}>
                <div style={styles.upDown.item}><ActionThumbUp color={white} style={styles.upDown.icon} />like {numeral(likeCount).format('0,0')}</div>
                <div style={styles.upDown.item}><ActionThumbDown color={white} style={styles.upDown.icon} />dislike {numeral(dislikeCount).format('0,0')}</div>
            </div>
        </div>
    )
    
    return (
        <GridTile
            key={id}
            title={title}
            subtitle={subtitle}
            onClick={onPlayVideoClick}
            onMouseOver={onStartPreviewVideoHover}
            onMouseOut={onStopPreviewVideoHover}
        >
            <img src={thumbnail} />
        </GridTile>
    )
}

Video.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    viewCount: PropTypes.string.isRequired,
    likeCount: PropTypes.string.isRequired,
    dislikeCount: PropTypes.string.isRequired,
    onPlayVideoClick: PropTypes.func.isRequired,
    onStartPreviewVideoHover: PropTypes.func.isRequired,
    onStopPreviewVideoHover: PropTypes.func.isRequired
}

export default Video