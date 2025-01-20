/** @format */

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCategorias, // Llamada a MockAPI para obtener categorías
  getVideos, // Llamada a MockAPI para obtener videos
  addVideo, // Llamada a MockAPI para agregar video
  updateVideo, // Llamada a MockAPI para actualizar video
  deleteVideo, // Llamada a MockAPI para eliminar video
} from "../../src/Api/Api";

const VideoContext = createContext();

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideos debe usarse dentro de un VideoProvider");
  }
  return context;
};

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoDestacado, setVideoDestacado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [videoData, categoriaData] = await Promise.all([
          getVideos(), // Se obtiene videos desde MockAPI
          getCategorias(), // Se obtienen categorías desde MockAPI
        ]);
        setVideos(videoData);
        setCategorias(categoriaData);
        const featuredVideo = videoData.find(
          (video) => video.destacado === true
        );
        setVideoDestacado(featuredVideo);
      } catch (err) {
        setError("Error al cargar datos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addNewVideo = async (video) => {
    try {
      if (video.destacado) {
        // Desmarcar el video previamente destacado
        const videoPrevioDestacado = videos.find((v) => v.destacado === true);
        if (videoPrevioDestacado) {
          await updateVideo(videoPrevioDestacado.id, {
            ...videoPrevioDestacado,
            destacado: false,
          });
        }
      }
      const newVideo = await addVideo(video); // Llamada a MockAPI para agregar el video
      setVideos((prevVideos) => [...prevVideos, newVideo]);

      // Actualizar el video destacado si es necesario
      if (video.destacado) {
        setVideoDestacado(newVideo);
      }
    } catch (err) {
      setError("Error al agregar video");
      console.error(err);
    }
  };

  const updateExistingVideo = async (id, updatedVideo) => {
    try {
      if (updatedVideo.destacado) {
        const videoPrevioDestacado = videos.find((v) => v.destacado === true);
        if (
          videoPrevioDestacado &&
          videoPrevioDestacado.id !== updatedVideo.id
        ) {
          await updateVideo(videoPrevioDestacado.id, {
            ...videoPrevioDestacado,
            destacado: false,
          });
        }
      }

      const updated = await updateVideo(id, updatedVideo); // Llamada a MockAPI para actualizar el video
      setVideos((prevVideos) =>
        prevVideos.map((v) => (v.id === id ? updated : v))
      );

      if (updatedVideo.destacado) {
        setVideoDestacado(updated);
      }
    } catch (err) {
      setError("Error al actualizar video");
      console.error(err);
    }
  };

  const removeVideo = async (id) => {
    try {
      await deleteVideo(id); // Llamada a MockAPI para eliminar el video
      setVideos((prevVideos) => prevVideos.filter((v) => v.id !== id));
      if (videoDestacado?.id === id) {
        setVideoDestacado(null);
      }
    } catch (err) {
      setError("Error al eliminar video");
      console.error(err);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        categorias,
        loading,
        error,
        videoDestacado,
        addNewVideo,
        updateExistingVideo,
        removeVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
