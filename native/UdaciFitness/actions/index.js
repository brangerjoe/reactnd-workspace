export const RECEIVE_DATA = 'RECEIVE_DATA'
export const ADD_ENTRY = 'ADD_ENTRY'

export function receiveData(data) {
    return {
        type: RECEIVE_DATA,
        data
    }
}

export function addEntry(entry) {
    return {
        type: ADD_ENTRY,
        entry
    }
}