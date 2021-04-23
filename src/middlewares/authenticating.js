const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("./jwt");

const authenticating = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({
      auth: false,
      message: "No token provided.",
    });

  jwt.verify(token, JWTSECRET, (err, decoded) => {
    if (err) {
      return res.send({
        message: "invalid token",
      });
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = { authenticating };
