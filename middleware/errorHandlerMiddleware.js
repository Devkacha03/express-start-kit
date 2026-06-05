export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err); // headers already sent, pass to next handler

  // Mongoose duplicate key error
  if (err.code === 11000) {
    err.message = "User with this email already exists";
    err.statusCode = 400;
  }
  console.log(err.stack);

  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ status, message });
}

export function error404Handler(req, res, next) {
  res.status(404).send("<h1>Page Not Found</h1>");
}
