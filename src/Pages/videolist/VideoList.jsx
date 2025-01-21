/** @format */

import React, { useEffect, useRef } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "./VideoList.css";

function VideoList({
  categoria,
  videos,
  categoriaColor,
  onEdit,
  onDelete,
  onColorChange,
  categoriaColorValue,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Ajustar el scroll al iniciar
    if (containerRef.current) {
      containerRef.current.scrollLeft = 1; // Ajustar scroll
    }
  }, [videos]);

  return (
    <div className="video-categoria">
      <div className="video-categoria-header">
        <h2
          className="video-categoria-titulo"
          style={{
            backgroundColor: categoriaColor,
          }}
        >
          {categoria}
        </h2>
        <input
          type="color"
          className="video-color-picker"
          value={categoriaColorValue}
          onChange={(e) => onColorChange(categoria, e.target.value)}
          title="Cambia color aquí"
        />
      </div>
      <div
        className="video-videos-container"
        ref={containerRef}
        style={{
          borderColor: categoriaColor,
        }}
      >
        <div className="video-videos">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-video"
              style={{
                borderColor: categoriaColor,
                boxShadow: `0 0 8px 2px ${categoriaColor}`,
              }}
            >
              <img
                src={video.urlImagen}
                alt={video.titulo}
                className="video-video-imagen"
                style={{
                  boxShadow: `0 0 10px 2px ${categoriaColor}`,
                }}
              />
              <div className="video-video-acciones">
                <button
                  className="video-video-boton"
                  onClick={() => onEdit(video)}
                >
                  <FaEdit size={23} /> Editar
                </button>
                <button
                  className="video-video-boton"
                  onClick={() => onDelete(video)}
                >
                  <FaTrash size={20} /> Borrar
                </button>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-video-boton"
                >
                  <FaEye size={23} /> Ver
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoList;
