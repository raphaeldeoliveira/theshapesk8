import StringActionTypes from "./action-types";

export const escrever = (payload) => {
    return {
        type: StringActionTypes.ESCREVER,
        payload,
    };
};
