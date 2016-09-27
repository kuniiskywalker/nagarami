const initialState = {channelId: "", keyword: "", sort: "date"};

const searchConditions = (state = initialState, action) => {
    const { searchConditions } = action;
    switch (action.type) {
        case 'SET_SEARCH_KEYWORD':
        case 'SET_SEARCH_CHANNEL_ID':
        case 'SET_SEARCH_SORT':
            return Object.assign({}, state, searchConditions);
        default:

            return state
    }
}
export default searchConditions
