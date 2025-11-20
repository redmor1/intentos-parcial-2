export function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.message} ${err.stack}`);

  let statusCode = err.status || 500;
  let message = err.message || "Error interno del servidor";

  res.status(statusCode).json({ error: message });
}
