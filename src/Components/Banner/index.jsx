/**
 * @format
 * @Banner
 */

import React from "react";
import styles from "./Banner.module.css";
import bannerImage from "../../assets/banner.jpg"; // Imagen de fondo predeterminada

const Banner = ({
  titulo = "",
  descripcion = "",
  categoria = "",
  urlImagen = "",
  color = "transparent", // Recibe el color para el cuadro de relleno
  overlayOpacity = 0.5,
}) => {
  return (
    <div
      className={styles.bannerContainer}
      style={{
        backgroundImage: `url(${urlImagen || bannerImage})`,
      }}
    >
      {/* Overlay */}
      <div
        className={styles.overlay}
        style={{
          backgroundColor: color,
          opacity: overlayOpacity,
        }}
      ></div>

      {/* Contenido del banner */}
      <div className={styles.bannerContent}>
        {/* Categoría */}
        {categoria && (
          <div
            className={styles.bannerCategory}
            style={{
              backgroundColor: color, // Aplicar el color de la categoría
              padding: "5px 10px",
              borderRadius: "20px",
              color: "white",
            }}
          >
            {categoria}
          </div>
        )}

        {/* Titulo */}
        {titulo && <div className={styles.bannerTitle}>{titulo}</div>}

        {/* Descripción */}
        {descripcion && (
          <div className={styles.bannerDescription}>{descripcion}</div>
        )}

        {/* URL de la imagen */}
        {urlImagen && (
          <div className={styles.bannerImageWrapper}>
            <img
              src={urlImagen}
              alt={titulo || "Imagen del video"}
              className={styles.bannerImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
