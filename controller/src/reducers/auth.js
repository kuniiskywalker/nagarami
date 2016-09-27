const initialState = {isLoggedIn: true};

const auth = (state = initialState, action) => {
    const { auth } = action;
    switch (action.type) {
        case 'AUTHORIZATION':
            return Object.assign({}, state, {
                isLoggedIn: auth.isLoggedIn
            })
        default:
            return state
    }
}
export default auth
