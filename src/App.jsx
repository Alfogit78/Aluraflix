/** @format */

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio/inicio";
import AgregarVideoPage from "./components/AgregarVideo/AgregarVideoPage";
import Cabecera from "./components/Cabecera/Cabecera";
import Pie from "./components/Pie/Pie";
import axios from "axios";
import { VideoProvider } from "./Contexts/VideoContext"; // Asegúrate de importar VideoProvider

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/Api/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error al cargar los videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <Router>
      <VideoProvider>
        <Cabecera />
        <main>
          <Routes>
            <Route path="/" element={<Inicio videos={videos} />} />
            <Route path="/agregar-video" element={<AgregarVideoPage />} />
          </Routes>
        </main>
        <Pie />
      </VideoProvider>
    </Router>
  );
};

export default App;
