// src/pages/CartPage.tsx

import React from "react";
import { useCart } from "../context/useCart";
import CartItem from "../components/CartItem";
import styles from "./CartPage.module.css";
import { CartItem as CartItemType } from "../types/cart";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className={styles.cartPageContainer}>
      <h1 className={styles.title}>Carrinho de Compras</h1>

      {cartItems.length === 0 ? (
        <p className={styles.emptyCartMessage}>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className={styles.cartItemsContainer}>
            {cartItems.map((item: CartItemType) => (
              <div key={item.product.id} className={styles.cartItem}>
                <CartItem
                  item={{
                    id: item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity,
                    imageUrl: item.product.imageUrl,
                    category: item.product.category,
                  }}
                  onRemoveItem={() => removeFromCart(item.product.id)}
                />
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button onClick={clearCart} className={styles.clearCartButton}>
              Limpar Carrinho
            </button>
            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
