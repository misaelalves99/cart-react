// src/context/useProduct.ts

import { useContext } from "react";
import { ProductContext } from "./ProductContext";

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct deve ser usado dentro de um ProductProvider");
  }
  return context;
};
