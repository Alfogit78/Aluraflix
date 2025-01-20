/** @format */

import React, { useState, useEffect, useMemo } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Alert,
} from "@mui/material";
import { getCategorias } from "../../../Api/Api"; // Función que consulta MockAPI
import { v4 as uuidv4 } from "uuid";
import "./FormularioAgregarVideo.css";

const FormularioAgregarVideo = ({ onSubmit }) => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    url: "",
    urlImagen: "",
    categoriaId: "",
    destacado: false,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch de las categorías desde MockAPI
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        // Llamada a la API MockAPI para obtener categorías
        const categoriasData = await getCategorias();
        setCategorias(categoriasData); // Asignar categorías al estado
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };
    fetchCategorias(); // Llamada inicial al efecto
  }, []); // Se ejecuta solo una vez, al montar el componente

  const memorizedCategorias = useMemo(() => categorias, [categorias]);

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = "El título es obligatorio.";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria.";
    if (!formData.url.trim() || !/^https?:\/\//.test(formData.url))
      newErrors.url = "La URL del video no es válida.";
    if (!formData.urlImagen.trim() || !/^https?:\/\//.test(formData.urlImagen))
      newErrors.urlImagen = "La URL de la imagen no es válida.";
    if (!formData.categoriaId)
      newErrors.categoriaId = "Selecciona una categoría.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Manejo de la acción de enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const nuevoVideo = { ...formData, id: uuidv4() };
    onSubmit(nuevoVideo); // Enviar datos al padre

    setSuccessMessage("Video agregado exitosamente!");
    handleReset();

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Resetear los campos del formulario
  const handleReset = () => {
    setFormData({
      titulo: "",
      descripcion: "",
      url: "",
      urlImagen: "",
      categoriaId: "",
      destacado: false,
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-agregar-video">
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      {/* Campo Título */}
      <div className="fila-dos-columnas">
        <TextField
          label="Título del Video"
          variant="outlined"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          error={!!errors.titulo}
          helperText={errors.titulo}
          className="campo-titulo"
        />

        {/* Selector de Categoría */}
        <FormControl className="campo-select-categoria">
          <Select
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
            displayEmpty
            error={!!errors.categoriaId}
          >
            <MenuItem value="" disabled>
              Selecciona una Categoría
            </MenuItem>
            {memorizedCategorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </Select>
          {errors.categoriaId && (
            <p className="error-mensaje">{errors.categoriaId}</p>
          )}
        </FormControl>
      </div>

      {/* Campos URL Imagen y URL Video */}
      <div className="fila-dos-columnas">
        <TextField
          label="URL de Imagen"
          variant="outlined"
          name="urlImagen"
          value={formData.urlImagen}
          onChange={handleChange}
          error={!!errors.urlImagen}
          helperText={errors.urlImagen}
          className="campo-url-imagen"
        />

        <TextField
          label="URL del Video"
          variant="outlined"
          name="url"
          value={formData.url}
          onChange={handleChange}
          error={!!errors.url}
          helperText={errors.url}
          className="campo-url-video"
        />
      </div>

      {/* Campo Descripción */}
      <div className="campo-descripcion-container">
        <label htmlFor="descripcion" className="campo-descripcion-label">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              descripcion: e.target.value,
            }))
          }
          className="campo-descripcion-textarea"
          placeholder="Escribe una descripción detallada del video..."
        ></textarea>
        {errors.descripcion && (
          <p className="error-mensaje">{errors.descripcion}</p>
        )}
      </div>

      {/* Switch de Destacado */}
      <FormControlLabel
        control={
          <Switch
            name="destacado"
            checked={formData.destacado}
            onChange={handleChange}
            color="primary"
          />
        }
        label="Destacar Video"
        className="campo-switch-destacado"
      />

      {/* Botones de Enviar y Limpiar */}
      <div className="botones-formulario">
        <button type="submit" className="boton-agregar">
          Agregar Video
        </button>
        <button type="button" className="boton-limpiar" onClick={handleReset}>
          Limpiar Campos
        </button>
      </div>
    </form>
  );
};

export default FormularioAgregarVideo;
