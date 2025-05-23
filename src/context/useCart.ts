// app/context/useCart.ts

'use client';

import { useContext } from 'react';
import { CartContext } from './CartContext';
import type { CartContextType } from './CartContext';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
