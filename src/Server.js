/** @format */

server.use((req, res, next) => {
  console.log(`Request Type: ${req.method} | Endpoint: ${req.url}`);

  // Solo validar cuando el método sea POST o PUT
  if (["POST", "PUT"].includes(req.method)) {
    const { titulo, descripcion, categoria, url, urlImagen, destacado } =
      req.body;

    // Verificación de campos requeridos (sin eliminar validaciones anteriores)
    if (!titulo || !descripcion || !categoria || !url || !urlImagen) {
      return res.status(400).json({
        error:
          "Todos los campos son obligatorios (titulo, descripcion, categoria, url, urlImagen).",
      });
    }

    // Si todo está bien, continuar con la solicitud
    next();
  } else {
    next();
  }
});
