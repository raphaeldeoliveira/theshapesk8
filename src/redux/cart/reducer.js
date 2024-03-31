import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL_PRICE, CLEAR_CART } from './action-types';

// Função para obter os dados do carrinho armazenados no localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const initialState = {
  cartItems: getCartFromLocalStorage(),
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + newItem.quantity
            };
          }
          return item;
        });
        // Atualize o localStorage com os novos dados do carrinho
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        localStorage.setItem('cart', JSON.stringify([...state.cartItems, newItem]));
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    case REMOVE_FROM_CART:
      const productId = action.payload;
      const updatedCartItems = state.cartItems.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case CLEAR_CART: // Novo case para limpar o carrinho
      localStorage.removeItem('cart'); // Remove os dados do carrinho do localStorage
      return {
        ...state,
        cartItems: [], // Define o carrinho como vazio
      };

    case CALCULATE_TOTAL_PRICE:
      const totalPrice = state.cartItems.reduce((acc, item) => {
        // Verifica se o preço e a quantidade são numéricos
        const itemPrice = Number(item.valor);
        const itemQuantity = Number(item.quantity);
        // Verifica se os valores são válidos antes de realizar a operação matemática
        if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
          return acc + (itemPrice * itemQuantity);
        } else {
          return acc;
        }
      }, 0);
      return {
        ...state,
        totalPrice: totalPrice,
      };

    default:
      return state;
  }
};

export default cartReducer;