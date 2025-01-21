/** @format */

// DeleteModal.jsx
import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import styles from "./DeleteModal.module.css";
import { deleteVideo } from "../../../Api/Api";

const DeleteModal = ({ videoId, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteVideo(videoId);
      onDelete(videoId);
      onClose();
    } catch (error) {
      console.error("Error al eliminar el video:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <FaTimes className={styles.closeIcon} onClick={onClose} />
        <h2>
          ¿Vas a eliminar video? Si es destacado recuerda asignar otro en
          Editar.
        </h2>
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
