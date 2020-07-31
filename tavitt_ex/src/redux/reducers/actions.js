export const ADD_ADDRESS = 'ADD_ADDRESS';
export const REMOVE_ADD_ADDRESS = 'ADD_ADDRESS';

export function addAddress(address) {
    return { type: ADD_ADDRESS, payload: address }
}