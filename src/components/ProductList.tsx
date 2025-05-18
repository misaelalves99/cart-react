// src/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { useCart } from "../context/useCart";
import { useProduct } from "../context/useProduct";
import styles from "./ProductList.module.css";
import { CartItem } from "../types/cart";
import { getProducts } from "../lib/api/products";

interface ProductListProps {
  products?: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { products: contextProducts, setProducts: setContextProducts } = useProduct();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleBuyNow = (product: Product) => {
    const cartItem: CartItem = {
      id: String(product.id),
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      product,
      category: product.category,
    };
    addToCart(cartItem);
    navigate("/checkout");
  };

  useEffect(() => {
    const load = async () => {
      try {
        if (products && products.length) {
          setContextProducts(products);
        } else {
          const baseProducts = await getProducts();
          setContextProducts(baseProducts);
        }
      } catch (err) {
        setError("Erro ao carregar produtos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [products, setContextProducts]);

  const displayProducts = products?.length ? products : contextProducts;

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!displayProducts.length) return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;

  return (
    <div className={styles.productGrid}>
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
      ))}
    </div>
  );
};

export default ProductList;
