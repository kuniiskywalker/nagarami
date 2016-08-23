const initialState = {channelId: "", keyword: "", sort: "date"};

const searchConditions = (state = initialState, action) => {
    const { searchConditions } = action;
    switch (action.type) {
        case 'SET_SEARCH_CONDITIONS':
            return Object.assign({}, state, searchConditions);
        default:

            return state
    }
}
export default searchConditions
