const errorMiddleWare = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.ackbool = err.ackbool || 0;
  err.message = err.message || "Internal Server Error Occured";

  if (err.code === 11000) {
    err.message = "Duplicate key error";
    err.statusCode = 400;
  }
  res.status(err.statusCode).json({
    ackbool: err.ackbool,
    message: err.message,
  });
};
module.exports = errorMiddleWare;
