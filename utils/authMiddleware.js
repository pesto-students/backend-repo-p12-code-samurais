// lib/authMiddleware.js
const { validateToken } = require("./jwtUtils");

const authMiddleware = (handler) => {
  return async (req, res) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token is missing" });
    }

    try {
      const user = validateToken(token);
      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;
