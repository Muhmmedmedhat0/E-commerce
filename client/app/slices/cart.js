import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    cardQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      state.cardQuantity += 1;
      state.products.push(action.payload);
      // calculate the pice by quantity number
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
