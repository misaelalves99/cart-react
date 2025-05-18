// src/components/Navbar.tsx

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Substituindo Next.js
import styles from "./Navbar.module.css";
import CartButton from "./CartButton"; // ✅ Botão do carrinho

const Navbar: React.FC = () => {
  const location = useLocation(); // Para obter a URL atual
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname); // Atualiza o path atual
  }, [location]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          Meu E-Commerce
        </Link>

        <div className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.link} ${currentPath === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`${styles.link} ${currentPath === "/products" ? styles.active : ""}`}
          >
            Produtos
          </Link>

          {/* ✅ Carrinho com contador */}
          <Link to="/cart" className={styles.link}>
            <CartButton />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
