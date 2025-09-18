import { Product } from './ProductTypes';

export interface CartItem extends Product {
  quantity: number;
}

export type RootState = {
  cart: CartItem[];
};
