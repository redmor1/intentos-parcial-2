function errorHandler(err, req, res, next) {
  console.error("Error: ", err);

  let statusCode = err.statusCode | 500;

  return res.status(statusCode).json({
    error: true,
    message: err.message || "Error interno del servidor",
  });
}

module.exports = errorHandler;
