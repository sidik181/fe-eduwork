import { SET_LOADING, UNSET_LOADING } from './constants'

export default function loadingReducer(state = false, { type }) {
    switch (type) {
        case SET_LOADING:
            return true
        case UNSET_LOADING:
            return false
        default:
            return state
    }
}
