import {OPEN_TOOLBAR, CLOSE_TOOLBAR, OPEN_SUBSCRIPTION_TOOLBAR, OPEN_PLAYLIST_TOOLBAR} from '../actions';

const toolbar = (state = {open: false}, action) => {
  switch (action.type) {
    case OPEN_TOOLBAR:
      return {
        open: true,
        subscriptionOpen: false,
        playlistOpen: false
      };
    case CLOSE_TOOLBAR:
      return {
        open: false,
        subscriptionOpen: false,
        playlistOpen: false
      };
    case OPEN_SUBSCRIPTION_TOOLBAR:
      return {
        open: false,
        subscriptionOpen: true,
        playlistOpen: false
      };
    case OPEN_PLAYLIST_TOOLBAR:
      return {
        open: false,
        subscriptionOpen: false,
        playlistOpen: true
      };
    default:
      return {
        open: false,
        subscriptionOpen: false,
        playlistOpen: false
      };
  }
};

export default toolbar;