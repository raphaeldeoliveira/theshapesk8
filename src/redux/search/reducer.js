import SearchActionTypes from "./action-types"

const initialState = {
    currentSearch: ''
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SearchActionTypes.ESCREVER:
            return { currentSearch: action.payload }
        default:
            return state;
    }
}

export default searchReducer;