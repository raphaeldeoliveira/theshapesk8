import CartActionTypes from "./action-types";

export const addItem = (payload) => {
    return {
        type: CartActionTypes.ADICIONAR_ITEM,
        payload,
    }
}

export const removeItem = (payload) => {
    return {
        type: CartActionTypes.REMOVER_ITEM,
        payload,
    }
}