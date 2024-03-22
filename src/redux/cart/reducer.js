import CartActionTypes from "./action-types";

const initialState = {
    carrinho: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CartActionTypes.ADICIONAR_ITEM:
            return { ...initialState, initialState: state }
        case CartActionTypes.REMOVER_ITEM:
            return { ...initialState, initialState: state }
        default:
            return state
    }
}

export default cartReducer