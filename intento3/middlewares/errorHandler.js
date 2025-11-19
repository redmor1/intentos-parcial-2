export default function errorHandler(err, req, res, next) {
  console.error(`Error: ${err.message} \n${err.stack}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Error interno del servidor";

  return res.status(statusCode).json({
    error: message,
  });
}
