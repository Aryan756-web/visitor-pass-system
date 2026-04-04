const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      // get token (ignore Bearer case)
      const parts = req.headers.authorization.split(" ");

      if (parts.length === 2) {
        token = parts[1];
      }

      if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = protect;