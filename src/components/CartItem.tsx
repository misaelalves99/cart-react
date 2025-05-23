// src/components/CartItem.tsx

import React from 'react';
import styles from './CartItem.module.css';

type CartItemType = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category?: string;
};

interface CartItemProps {
  item: CartItemType;
  onRemoveItem: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemoveItem }) => {
  if (!item) return <p className={styles.error}>Produto não encontrado.</p>;

  const totalPrice = item.price * item.quantity;

  const handleRemoveClick = () => {
    const productId = typeof item.id === 'string' ? parseInt(item.id, 10) : item.id;
    onRemoveItem(productId);
  };

  return (
    <div className={styles.cartItem}>
      <img
        src={item.imageUrl || '/placeholder.jpg'}
        alt={item.name}
        className={styles.image}
      />
      <div className={styles.details}>
        <h3 className={styles.name}>{item.name}</h3>
        {item.category && <p className={styles.category}>{item.category}</p>}
        <p className={styles.price}>Preço: R$ {item.price.toFixed(2)}</p>
        <p className={styles.quantity}>Qtd: {item.quantity}</p>
        <p className={styles.total}>Total: R$ {totalPrice.toFixed(2)}</p>
      </div>
      <button className={styles.removeButton} onClick={handleRemoveClick}>
        Remover
      </button>
    </div>
  );
};

export default CartItem;
