const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //split will return array and first element of this array bearer and second is token.
    const result = jwt.verify(token, "secret");
    if (result) {
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "authentication failed",
    });
  }
};
