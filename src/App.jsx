/** @format */

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Pages/Inicio/inicio";
import AgregarVideoPage from "./Components/AgregarVideo/AgregarVideoPage";
import Cabecera from "./Components/Cabecera/Cabecera";
import Pie from "./Components/Pie/Pie";
import axios from "axios";
import { VideoProvider } from "./Contexts/VideoContext";
import PageNotFound from "./Pages/NotFound/PageNotFound";
import "./App.css";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/Api/Api");
        setVideos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los videos:", error);
        setIsLoading(false); // Dejar de cargar incluso si hay un error
      }
    };
    fetchVideos();
  }, []);

  return (
    <Router>
      <VideoProvider>
        <Cabecera />
        <main>
          {isLoading ?
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              Loading videos...
            </div>
          : <Routes>
              <Route path="/" element={<Inicio videos={videos} />} />
              <Route path="/agregar-video" element={<AgregarVideoPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          }
        </main>
        <Pie />
      </VideoProvider>
    </Router>
  );
};

export default App;
