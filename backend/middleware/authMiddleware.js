// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied");

  try {
    req.user = jwt.verify(token, "SECRETKEY");
    next();
  } catch {
    res.status(400).send("Invalid token");
  }
};
