const channels = (state = {count: 0}, action) => {
    const { channels } = action;
    switch(action.type) {
  　 case 'FETCH_CHANNELS':
      return channels
  　 default:
        return state
    }
}

export default channels
