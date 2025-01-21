/** @format */

import React from "react";
import { useVideos } from "../../contexts/VideoContext";
import FormularioAgregarVideo from "../../pages/FormularioAgregarVideo/FormularioAgregarVideo";
import "./AgregarVideoPage.css";

const AgregarVideoPage = () => {
  const { addNewVideo } = useVideos();

  const handleSubmit = (nuevoVideo) => {
    addNewVideo(nuevoVideo);
  };

  return (
    <div className="agregar-form">
      <div className="titulo-container tabla-formulario">
        <div className="fila">
          <h2 className="form-titulo-uno tipo-letra">NUEVO VIDEO</h2>
        </div>
        <div className="fila">
          <h3 className="form-titulo-dos tipo-letra">
            Complete el formulario para crear una nueva tarjeta de video
          </h3>
        </div>
        <div className="fila">
          <h4 className="form-subtitulo tipo-letra">Crear Tarjeta</h4>
        </div>
      </div>
      <FormularioAgregarVideo onSubmit={handleSubmit} />
    </div>
  );
};

export default AgregarVideoPage;
