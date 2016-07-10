import React, { PropTypes } from 'react'
import PreviewPlayer from './PreviewPlayer'

const Video = ({ id, title, thumbnail, preview, onVideoPlayClick, onVideoPreviewClick }) => (
    <li>
        <a href="#"
           onClick={e => {
             e.preventDefault()
             onVideoPlayClick()
           }}
        >
            {title}
        </a>
        <a href="#"
           onClick={e => {
             e.preventDefault()
             onVideoPreviewClick()
           }}
            >
            { !preview ? <img src={thumbnail} /> : null }
            { preview ? <PreviewPlayer
                key={id}
                id={id}
                onPause={() => {onVideoPreviewClick()}}
                /> : null }
        </a>
    </li>
)

Video.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    preview: PropTypes.bool.isRequired,
    onVideoPlayClick: PropTypes.func.isRequired,
    onVideoPreviewClick: PropTypes.func.isRequired
}

export default Video