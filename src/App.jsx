/** @format */

// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { VideoProvider } from "./contexts/VideoContext";
import Inicio from "./pages/Inicio/inicio";
import AgregarVideoPage from "./components/AgregarVideo/AgregarVideoPage";
import Cabecera from "./components/Cabecera/Cabecera";
import Pie from "./components/Pie/Pie";

const App = () => {
  return (
    <VideoProvider>
      <Router>
        <Cabecera />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/agregar-video" element={<AgregarVideoPage />} />
          </Routes>
        </main>
        <Pie />
      </Router>
    </VideoProvider>
  );
};

export default App;
