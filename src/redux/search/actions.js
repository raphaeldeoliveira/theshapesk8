import StringActionTypes from "./action-types";

export const escrever = (payload) => {
    console.log("Action despachada com payload:", payload); // Adiciona um console.log para verificar se a action está sendo chamada
    return {
        type: StringActionTypes.ESCREVER,
        payload,
    };
};
