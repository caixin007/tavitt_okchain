import {
    ADD_ADDRESS,
    // addAddress
} from './actions';

import { combineReducers } from 'redux';

function addAddressReducer(state = null, action) {
    switch (action.type) {
        case ADD_ADDRESS:
            return Object.assign({}, state, {
                address: action.payload
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    address: addAddressReducer
})

export default rootReducer