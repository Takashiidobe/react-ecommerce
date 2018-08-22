const verifyToken = function(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    req.token = bearerHeader;
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
