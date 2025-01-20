/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaHome } from "react-icons/fa";
import styles from "./Pie.module.css";
import logo from "./logo-alura.png";

function Pie() {
  return (
    <footer className={styles.footer}>
      {/* Pantallas grandes: Texto con logo */}
      <div className={styles.desktopFooter}>
        <h2>
          Desarrollado por <img src={logo} alt="Alura" />
        </h2>
      </div>

      {/* Responsive: Botones de navegación */}
      <div className={styles.responsiveFooter}>
        <Link to="/" className={styles.menuButton}>
          <FaHome size={16} style={{ marginRight: "8px" }} /> INICIO
        </Link>
        <Link to="/agregar-video" className={styles.menuButton}>
          <FaPlus size={20} />
        </Link>
      </div>
    </footer>
  );
}

export default Pie;
