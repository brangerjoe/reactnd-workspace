import { RECEIVE_DATA, ADD_ENTRY } from '../actions'

export default function entries(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DATA:
            return {
                ...state,
                ...action.entries
            }
        case ADD_ENTRY:
            return {
                ...state,
                ...action.entry
            }
        default:
            return state;
    }
}