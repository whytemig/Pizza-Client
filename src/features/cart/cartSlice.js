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
      state.cart.filter((item) => item.pizzaId !== action.payload);
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
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
