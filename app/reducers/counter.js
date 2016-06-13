import { INCREMENT, DECREMENT } from '../actions/counter';
// import { INCREMENT, DECREMENT, IPC_PONG } from '../actions/counter';

export default function counter(state=0, action) {
    switch(action.type) {
    case INCREMENT:
        return state + 1;
    case DECREMENT:
        return state - 1;
    // case IPC_PONG:
    //     console.log('Pong', action); // eslint-disable-line no-console
    //     return state;
    default:
        return state;
    }
}
