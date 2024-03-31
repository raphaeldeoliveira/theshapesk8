import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL_PRICE, CLEAR_CART } from './action-types';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: {
    id: product.id,
    nome: product.nome,
    descricao: product.descricao,
    imagem: product.imagem,
    valor: product.valor,
    tamanho: product.tamanho,
    quantity: 1 // Defina a quantidade inicial como 1 ao adicionar o produto ao carrinho
  },
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const calculateTotalPrice = () => ({
  type: CALCULATE_TOTAL_PRICE,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
