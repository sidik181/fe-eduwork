import { START_FETCHING_PRODUCT } from "../product/constants"

const initialState = {
    data: [],
    currentPage: 1,
    totalItems: -1,
    perPage: 8,
    keyword: '',
    category: '',
    tags: [],
    selectedProduct: {}
}

export default function cartReducer(state = initialState, { type, payload }) {
    switch (type) {
        case START_FETCHING_PRODUCT:
            return { ...state, }
        default:
            return state
    }
}
