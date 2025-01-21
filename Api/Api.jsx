/** @format */

import axios from "axios";

// URL base de MockAPI
const API_URL_CATEGORIAS =
  "https://6783b5118b6c7a1316f54c7c.mockapi.io/api/v1/categorias";
const API_URL_VIDEOS =
  "https://6783b5118b6c7a1316f54c7c.mockapi.io/api/v1/videos";

// Manejo centralizado de errores
const handleApiError = (error) => {
  console.error("Error en la API:", error);
  if (error.response) {
    console.error(
      `Estado: ${error.response.status}, Datos:`,
      error.response.data
    );
    throw new Error(
      error.response.data?.message ||
        "Error inesperado en la comunicación con la API."
    );
  } else if (error.request) {
    console.error("No se recibió respuesta del servidor:", error.request);
    throw new Error("No se pudo conectar al servidor. Verifique su conexión.");
  } else {
    throw new Error("Error al configurar la solicitud: " + error.message);
  }
};

// Obtener todas las categorías
export const getCategorias = async () => {
  try {
    const response = await axios.get(API_URL_CATEGORIAS);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener todos los videos
export const getVideos = async () => {
  try {
    const response = await axios.get(API_URL_VIDEOS);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Obtener videos filtrados por categoriaId
export const getVideosByCategory = async (categoriaId) => {
  try {
    const response = await axios.get(API_URL_VIDEOS, {
      params: { categoriaId },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Agregar un nuevo video
export const addVideo = async (videoData) => {
  try {
    const response = await axios.post(API_URL_VIDEOS, videoData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Actualizar un video existente
export const updateVideo = async (videoId, videoData) => {
  try {
    const response = await axios.put(`${API_URL_VIDEOS}/${videoId}`, videoData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Eliminar un video
export const deleteVideo = async (videoId) => {
  try {
    await axios.delete(`${API_URL_VIDEOS}/${videoId}`);
  } catch (error) {
    handleApiError(error);
  }
};
