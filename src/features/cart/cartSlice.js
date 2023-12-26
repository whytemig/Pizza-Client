import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItem: (state, action) => {
      const pizzaItem = state.cart.find(
        (item) => item.pizzaId === action.payload
      );
      pizzaItem.quantity += 1;
      pizzaItem.totalPrice = pizzaItem.quantity * pizzaItem.unitPrice;
    },
    decreaseItem: (state, action) => {
      const pizzaItem = state.cart.find(
        (item) => item.pizzaId === action.payload
      );
      pizzaItem.quantity -= 1;
      pizzaItem.totalPrice = pizzaItem.quantity * pizzaItem.unitPrice;
      if (pizzaItem.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export function totalCartQuantity(state) {
  return state.cart.cart?.reduce((sum, item) => sum + item.quantity, 0);
}

export function totalCartPrice(state) {
  return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
}

export function getCurrentQuantity(id) {
  return function (state) {
    const pizzaItem = state.cart.cart.find((item) => item.pizzaId === id);

    return pizzaItem?.quantity ? pizzaItem.quantity : 0;
  };
}

// export const getCurrentQuantity = (id) => (state) =>
//   state.cart.cart.find((item) => item.pizzaId === id);

export const getCart = (state) => state.cart.cart;
