import { CALENDAR_STORAGE_KEY } from './_calendar'
import { AsyncStorage } from 'react-native'

export function SubmitEntry({ key, entry }) {
    AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function RemoveEntry(key) {
    AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
        })
}