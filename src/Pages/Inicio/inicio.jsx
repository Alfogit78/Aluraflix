/** @format */

import React, { useEffect, useState, useMemo } from "react";
import EditModal from "../../components/EditModal/EditModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { useVideos } from "../../contexts/VideoContext";
import Banner from "../../components/Banner/index";
import VideoList from "../../pages/videolist/VideoList";
import "./Inicio.css";

function Inicio() {
  const {
    videos,
    setVideos,
    categorias,
    videoDestacado,
    setVideoDestacado,
    updateExistingVideo,
    removeVideo,
  } = useVideos();

  const [videosPorCategoria, setVideosPorCategoria] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [categoriaColors, setCategoriaColors] = useState({
    "Front-End": "#28a745",
    Programación: "#007bff",
    Diseño: "#ffc107",
    "Back-End": "#df6ab2",
    DevOps: "#eb7f64",
  });

  const memoizedVideoDestacado = useMemo(
    () => videoDestacado,
    [videoDestacado]
  );

  useEffect(() => {
    if (!videos || !categorias) return;

    // Creamos un objeto para relacionar los nombres de las categorías con sus IDs
    const categoriasPorId = categorias.reduce((acc, categoria) => {
      acc[categoria.id] = categoria.nombre;
      return acc;
    }, {});

    // Usamos el array original de categorías para mantener el orden
    const agrupados = categorias.reduce((acc, categoria) => {
      const categoriaNombre = categoria.nombre;

      // Filtramos los videos que pertenecen a esta categoría
      acc[categoriaNombre] = videos.filter(
        (video) => video.categoriaId === categoria.id
      );
      return acc;
    }, {});

    setVideosPorCategoria(agrupados);
  }, [videos, categorias]);

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  const handleDelete = (video) => {
    setSelectedVideo(video);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = async (updatedVideo) => {
    try {
      await updateExistingVideo(updatedVideo.id, updatedVideo);
      console.log("Video actualizado correctamente:", updatedVideo);

      // Actualizar el estado de videos
      setVideosPorCategoria((prev) => {
        const newVideosPorCategoria = { ...prev };
        Object.keys(newVideosPorCategoria).forEach((categoria) => {
          newVideosPorCategoria[categoria] = newVideosPorCategoria[
            categoria
          ].map((video) =>
            video.id === updatedVideo.id ? updatedVideo : video
          );
        });
        return newVideosPorCategoria;
      });

      // Actualizar el estado del video destacado
      if (updatedVideo.destacado) {
        const newVideos = videos.map((video) =>
          video.id === updatedVideo.id ?
            updatedVideo
          : { ...video, destacado: false }
        );
        setVideos(newVideos);
        setVideoDestacado(updatedVideo);
      }
    } catch (error) {
      console.error("Error al actualizar el video:", error);
    } finally {
      setIsEditModalOpen(false);
      setSelectedVideo(null);
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      await removeVideo(id);
      console.log(`Video eliminado correctamente con ID ${id}`);

      // Actualizar el estado de videos después de la eliminación
      setVideosPorCategoria((prev) => {
        const newVideosPorCategoria = { ...prev };
        Object.keys(newVideosPorCategoria).forEach((categoria) => {
          newVideosPorCategoria[categoria] = newVideosPorCategoria[
            categoria
          ].filter((video) => video.id !== id);
        });
        return newVideosPorCategoria;
      });

      // Actualizar el estado del video destacado
      if (videoDestacado && videoDestacado.id === id) {
        const newVideos = videos.filter((video) => video.id !== id);
        const nuevoDestacado =
          newVideos.find((video) => video.destacado) || null;
        setVideos(newVideos);
        setVideoDestacado(nuevoDestacado);
      }
    } catch (error) {
      console.error("Error al eliminar el video:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedVideo(null);
    }
  };

  const handleColorChange = (categoria, color) => {
    setCategoriaColors((prevColors) => ({
      ...prevColors,
      [categoria]: color,
    }));
  };

  const getCategoriaColor = (categoria) => {
    return categoriaColors[categoria] || "#0a045e"; // Color por defecto
  };

  const categoriaDestacada = categorias.find(
    (cat) => cat.id === memoizedVideoDestacado?.categoriaId
  );
  const colorCategoriaDestacada =
    categoriaDestacada ?
      getCategoriaColor(categoriaDestacada.nombre)
    : "#42ee6d";

  if (
    !videos ||
    !categorias ||
    categorias.length === 0 ||
    videos.length === 0
  ) {
    return (
      <div className="inicio-loading">Cargando videos y categorías...</div>
    );
  }

  return (
    <div>
      <div className="inicio-banner">
        <Banner
          titulo={memoizedVideoDestacado ? memoizedVideoDestacado.titulo : ""}
          descripcion={
            memoizedVideoDestacado ? memoizedVideoDestacado.descripcion : ""
          }
          categoria={
            memoizedVideoDestacado ?
              categorias.find(
                (cat) => cat.id === memoizedVideoDestacado.categoriaId
              )?.nombre
            : ""
          }
          color={colorCategoriaDestacada}
        />
        {memoizedVideoDestacado && (
          <div className="video-destacado">
            <img
              src={memoizedVideoDestacado.urlImagen}
              alt={memoizedVideoDestacado.titulo || "Video destacado"}
              className="video-destacado-imagen"
            />
          </div>
        )}
      </div>

      <div className="inicio">
        {categorias.map((categoria) => {
          const categoriaNombre = categoria.nombre;

          if (!videosPorCategoria[categoriaNombre]) return null; // No renderizamos categorías vacías

          return (
            <VideoList
              key={categoriaNombre}
              categoria={categoriaNombre}
              videos={videosPorCategoria[categoriaNombre]}
              categoriaColor={getCategoriaColor(categoriaNombre)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onColorChange={handleColorChange}
              categoriaColorValue={getCategoriaColor(categoriaNombre)}
            />
          );
        })}

        {isEditModalOpen && selectedVideo && (
          <EditModal
            video={selectedVideo}
            categorias={categorias}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveEdit}
            videos={videos} // Pasamos la lista de videos a EditModal
          />
        )}

        {isDeleteModalOpen && selectedVideo && (
          <DeleteModal
            videoId={selectedVideo.id}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => handleConfirmDelete(selectedVideo.id)}
          />
        )}
      </div>
    </div>
  );
}

export default Inicio;
