const initialState = {
    search: '',
}   

const searchReducer = (state = initialState, value) => {
    switch (value.type) {
        case "search/writesearch":
            return { ...state, search: value.payload };
        default:
            return state
    }
}

export default searchReducer;