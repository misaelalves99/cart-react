// src/context/ProductProvider.tsx

import React, { useState, ReactNode } from "react";
import { Product } from "../types/product";
import { getProducts } from "../lib/api/products";
import { ProductContext } from "./ProductContext";

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    getProducts()
      .then(setProducts)
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
