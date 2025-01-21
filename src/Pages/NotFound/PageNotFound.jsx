/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to="/">Inicio</Link>
    </div>
  );
};

export default PageNotFound;
