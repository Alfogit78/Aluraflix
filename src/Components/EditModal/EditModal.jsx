/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import styles from "./EditModal.module.css";

const EditModal = ({ video, categorias, onClose, onSave }) => {
  // Estado que controla los datos visuales del formulario
  const [formData, setFormData] = useState({ ...video });
  // Estado para los datos visuales que se usan en el formulario (copia)
  const [formDataVisible, setFormDataVisible] = useState({ ...video });

  useEffect(() => {
    // Solo se actualiza cuando se cierra o se abre el modal (restaurar el estado original)
    setFormData({ ...video });
    setFormDataVisible({ ...video }); // Resetear la vista
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

    // Si no hay cambios, no hacemos nada
    if (JSON.stringify(formData) === JSON.stringify(formDataVisible)) {
      console.log("No hay cambios");
      return;
    }

    // Aquí realizamos el PUT si hay cambios en formData
    try {
      const response = await fetch(
        `https://678d6e91f067bf9e24ea4990.mockapi.io/api/v1/videos/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataVisible), // Enviar los datos visibles modificados
        }
      );

      if (response.ok) {
        const updatedVideo = await response.json();
        onSave(updatedVideo); // Notificar al componente padre sobre los cambios
      } else {
        console.error("Error al actualizar el video:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  const handleReset = () => {
    // Solo restablecer la vista sin afectar el estado original de formData
    setFormDataVisible({
      titulo: "",
      descripcion: "",
      url: "",
      urlImagen: "",
      categoriaId: "",
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
      </div>
    </div>
  );
};

EditModal.propTypes = {
  video: PropTypes.object.isRequired,
  categorias: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditModal;
