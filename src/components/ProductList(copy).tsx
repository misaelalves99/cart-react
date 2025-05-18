// src/components/ProductList.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // v6
import { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import styles from "./ProductList.module.css";
import { CartItem } from "../types/cart";

interface ProductListProps {
  products: Product[];
  selectedCategory?: string;
  filter?: "lowToHigh" | "highToLow" | "";
  searchQuery?: string;
  priceRange?: [number, number];
  overrideProducts?: Product[];
}

const ProductList: React.FC<ProductListProps> = ({
  selectedCategory = "",
  filter = "",
  searchQuery = "",
  priceRange = [0, Infinity],
  overrideProducts = [],
}) => {
  const { products, setProducts } = useProduct();
  const { addToCart } = useCart();
  const navigate = useNavigate(); // ✅ v6
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
      product: product,
      category: product.category,
    };
    addToCart(cartItem);
    navigate("/checkout"); // ✅ Atualizado
  };

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      return await res.json();
    } catch (err) {
      setError("Erro ao carregar produtos");
      throw err;
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const base = overrideProducts.length
          ? overrideProducts
          : await fetchProducts();

        const filtered = base.filter((p) =>
          (!selectedCategory || p.category === selectedCategory) &&
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          p.price >= priceRange[0] &&
          p.price <= priceRange[1]
        );

        if (filter === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
        if (filter === "highToLow") filtered.sort((a, b) => b.price - a.price);

        setProducts(filtered);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [filter, selectedCategory, searchQuery, priceRange, overrideProducts]);

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!products.length) return <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>;

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuyNow={handleBuyNow}
        />
      ))}
    </div>
  );
};

export default ProductList;
