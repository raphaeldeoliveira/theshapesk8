import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL_PRICE } from './action-types';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const calculateTotalPrice = () => ({
  type: CALCULATE_TOTAL_PRICE,
});