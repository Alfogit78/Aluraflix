/** @format */

import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa"; // Ícono de cierre
import styles from "./DeleteModal.module.css"; // Estilos del modal

const DeleteModal = ({ videoId, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://678d6e91f067bf9e24ea4990.mockapi.io/api/v1/videos/${videoId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        onDelete(videoId); // Notificar al componente padre que el video fue eliminado
        onClose(); // Cerrar modal
      } else {
        console.error("Error al eliminar el video:", response.statusText);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <FaTimes className={styles.closeIcon} onClick={onClose} />
        <h2>¿Seguro que quieres eliminar este video?</h2>
        <div className={styles.formButtons}>
          <button className="button-delete" onClick={handleDelete}>
            Eliminar
          </button>
          <button onClick={onClose} className="button-delete">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
