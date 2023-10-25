import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        // Check if we exceed the total available quantity
        if (
          existingItem.quantity + action.payload.quantity >
          action.payload.totalQty
        ) {
          state.errorMessage = "no stock left";
          return;
        }
        existingItem.quantity += action.payload.quantity;
      } else {
        if (action.payload.quantity > action.payload.totalQty) {
          state.errorMessage = "no stock left";
          return;
        }
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
