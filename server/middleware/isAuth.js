const tokenService = require("../services/token-service.js");

module.exports = function isAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    //   console.log("auth he", authHeader);
    const accessToken = authHeader.split(" ")[1];
    //   console.log("accessToken ", accessToken);
    const userData = tokenService.validateAccessToken(accessToken);
    req.userData = userData;
    if (!userData.id) {
      return res.json("unauth");
    }
    next();
  } catch (e) {
    console.log(e);
    next(e);
  }
};
