const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, "saurav", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
