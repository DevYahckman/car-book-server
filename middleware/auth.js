const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access Denied no token");

  try {
    const decode = jwt.verify(token, 1234);
    req.user = decode;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
