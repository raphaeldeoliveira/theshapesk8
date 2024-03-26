import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL_PRICE } from './action-types';

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
  const newItem = action.payload;
  const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);

  if (existingItemIndex !== -1) {
    // If the item already exists in the cart, create a new array with updated quantities
    const updatedCartItems = state.cartItems.map((item, index) => {
      if (index === existingItemIndex) {
        return {
          ...item,
          quantity: item.quantity + newItem.quantity
        };
      }
      return item;
    });
    return {
      ...state,
      cartItems: updatedCartItems,
    };
  } else {
    // If the item is not in the cart, add it
    return {
      ...state,
      cartItems: [...state.cartItems, newItem],
    };
  }

    case REMOVE_FROM_CART:
      console.log("reducer remove")
      const productId = action.payload;
      const updatedCartItems = state.cartItems.filter(item => item.id !== productId);
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case CALCULATE_TOTAL_PRICE:
      const totalPrice = state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return {
        ...state,
        totalPrice: totalPrice,
      };

    default:
      return state;
  }
};

export default cartReducer;