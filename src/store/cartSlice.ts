import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/ProductTypes';

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const existingItem = state.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
