/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import styles from "./Editmodal.module.css";
import { updateVideo } from "../../../Api/Api";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const EditModal = ({ video, categorias, onClose, onSave, videos }) => {
  const [formData, setFormData] = useState({ ...video });
  const [formDataVisible, setFormDataVisible] = useState({ ...video });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setFormData({ ...video });
    setFormDataVisible({ ...video });
  }, [video]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDataVisible({
      ...formDataVisible,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (JSON.stringify(formData) === JSON.stringify(formDataVisible)) {
      console.log("No hay cambios");
      return;
    }

    // Verificar y ajustar el campo destacado
    const updatedData = { ...formDataVisible };
    if (formDataVisible.destacado) {
      // logica para destacar videos
      const otherHighlightedVideos = videos.filter(
        (video) => video.destacado && video.id !== formDataVisible.id
      );
      for (let otherVideo of otherHighlightedVideos) {
        await updateVideo(otherVideo.id, { ...otherVideo, destacado: false });
      }
    }

    try {
      const updatedVideo = await updateVideo(formData.id, updatedData);
      onSave(updatedVideo);
      setShowConfirmation(true); // Mostrar el mensaje de confirmación

      // Ocultar el mensaje de confirmación después de 3 segundos
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  const handleReset = () => {
    setFormDataVisible({
      titulo: "",
      descripcion: "",
      url: "",
      urlImagen: "",
      categoriaId: "",
      destacado: false,
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Editar Video</h2>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <label htmlFor="titulo">Título:</label>
          <input
            id="titulo"
            type="text"
            name="titulo"
            value={formDataVisible.titulo || ""}
            onChange={handleChange}
            placeholder="Título"
            required
          />
          <label htmlFor="categoriaId">Categoría:</label>
          <select
            id="categoriaId"
            name="categoriaId"
            value={formDataVisible.categoriaId || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <label htmlFor="urlImagen">URL de la Imagen:</label>
          <input
            id="urlImagen"
            type="url"
            name="urlImagen"
            value={formDataVisible.urlImagen || ""}
            onChange={handleChange}
            placeholder="URL de la Imagen"
            required
          />
          <label htmlFor="url">URL del Video:</label>
          <input
            id="url"
            type="url"
            name="url"
            value={formDataVisible.url || ""}
            onChange={handleChange}
            placeholder="URL del Video"
            required
          />
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formDataVisible.descripcion || ""}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <FormControlLabel
            control={
              <Switch
                name="destacado"
                checked={formDataVisible.destacado}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Destacar Video"
            className="campo-switch-destacado"
          />
          <div className={styles.buttons}>
            <button type="submit" className={styles.saveButton}>
              Guardar Cambios
            </button>
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              Limpiar
            </button>
          </div>
        </form>
        {showConfirmation && (
          <div className={styles.confirmation}>
            La edición fue realizada correctamente
          </div>
        )}
      </div>
    </div>
  );
};

EditModal.propTypes = {
  video: PropTypes.object.isRequired,
  categorias: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  videos: PropTypes.array.isRequired,
};

export default EditModal;
