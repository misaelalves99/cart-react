// src/components/ProductCard.tsx

import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { Product } from "../types/product";
import { CartItem } from "../types/cart";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) throw new Error("CartContext não encontrado");
  const { addToCart } = cartContext;

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      product: product,
    };
    addToCart(cartItem);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.imageUrl || "/images/product-placeholder.png"}
          alt={product.name}
          width={300}
          height={300}
          className={styles.productImage}
        />
      </div>

      <div className={styles.details}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>

        <div className={styles.buttonGroup}>
          <button
            className={styles.cartButton}
            onClick={handleAddToCart}
            title="Adicionar ao carrinho"
          >
            <FaCartPlus size={20} />
          </button>
          <button
            className={styles.buyButton}
            onClick={() => onBuyNow?.(product)}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// 01-Estruturas e Tratamento -
// 02-Funções e Métodos -
// 03-Arrays -
// 05-Formulários e Eventos -
// 06-Hooks -
// 07-Props e Router -