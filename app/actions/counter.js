export const INCREMENT = Symbol('INCREMENT');
export const DECREMENT = Symbol('DECREMENT');
// export const IPC_PONG = Symbol('IPC_PONG');

export function increment() {
    return {
        type: INCREMENT
    };
}

export function decrement() {
    return {
        type: DECREMENT
    };
}

// export function pongActionCreator(event, arg1, arg2, arg3) {
//     return {
//         type: 'IPC_PONG',
//         arg1,
//         arg2,
//         arg3
//     };
// }
