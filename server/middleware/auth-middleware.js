const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    // console.log("authHeader", authHeader);
    if (!authHeader) {
      console.log("!authHEa");
      return next(ApiError.UnathorizedError());
    }
    const accessToken = authHeader.split(" ")[1];
    // console.log("========accessToken=========", accessToken);

    if (!accessToken) {
      console.log("!accessTo");
      return next(ApiError.UnathorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    console.log("userdata", userData);
    if (userData.id) {
      req.user.id = userData.id;
      console.log(req.user.id);
      req.user = userData;
      next();
    }
    onsole.log("!userdata");
    return next(ApiError.UnathorizedError());
  } catch (e) {
    return next(ApiError.UnathorizedError());
  }
};
