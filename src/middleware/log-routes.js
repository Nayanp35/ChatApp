const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

module.exports = logRoutes;
