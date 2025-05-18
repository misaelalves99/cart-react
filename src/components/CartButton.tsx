// src/components/CartButton.tsx

import React from 'react';
import { useCart } from '../context/useCart'; // <-- Caminho corrigido
import { FaShoppingCart } from 'react-icons/fa';
import type { CartItem } from '../types/cart';
import styles from './CartButton.module.css';

const CartButton: React.FC = () => {
  const { cartItems } = useCart();

  const itemCount = cartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);

  return (
    <button className={styles.cartButton}>
      <FaShoppingCart className={styles.icon} />
      {itemCount > 0 && <span className={styles.cartCount}>{itemCount}</span>}
    </button>
  );
};

export default CartButton;
