const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // get token from header
  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    token = parts[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user
    next();

  } catch (err) {
    console.log("Token error:", err.message);
    res.status(401).json({ message: "Token not valid" });
  }
};

module.exports = protect;