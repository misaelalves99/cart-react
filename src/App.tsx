// src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartProvider";
import { ProductProvider } from "./context/ProductProvider";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ProductProvider>
          <div className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto p-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ProductProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
