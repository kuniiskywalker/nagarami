const subscriptions = (state = [], action) => {
    const { subscriptions } = action;
    switch (action.type) {
        case 'FETCH_SUBSCRIPTION':
            return subscriptions
        default:
            return state
    }
}
export default subscriptions
