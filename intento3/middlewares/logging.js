export default function logging(req, res, next) {
  console.log(req.method, req.originalUrl);

  next();
}
