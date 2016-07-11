const initialState = {is_logged_in: true};

const auth = (state = initialState, action) => {
    const { auth } = action;
    switch (action.type) {
        case 'AUTHORIZATION':
            return Object.assign({}, state, {
                is_logged_in: auth.is_logged_in
            })
        default:
            return state
    }
}
export default auth
