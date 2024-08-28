const UserServices = require("../services/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { name, email, password } = req.body;
      const userData = await UserServices.registration(email, password, name);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserServices.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserServices.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activation(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserServices.activation(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  // async refresh(req, res, next) {
  //   try {
  //     const { refreshToken } = req.cookies;
  //     const userData = await UserServices.refresh(refreshToken);
  //     res.cookie("refreshToken", userData.refreshToken, {
  //       maxAge: 30 * 24 * 60 * 60 * 1000,
  //       httpOnly: true,
  //     });
  //     return res.json(userData);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) return res.json("auth: false");

      const userData = await UserServices.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async checkAuth(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) return res.json("auth: false");

      const userData = await UserServices.checkAuth(refreshToken);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }



  async updUser(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const formData = req.body;
      const imageName = formData.nameImg;
      const basePath = `${req.protocol}://${req.get(
        "host"
      )}/public/${imageName}`;
      const userData = await UserServices.updUser(
        refreshToken,
        formData.name,
        formData.status,
        basePath
      );
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async uploadImg(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { image } = req.files;
      if (!image) return res.sendStatus(400);
      const userData = await UserServices.uploadImg(refreshToken, image);
      return res.sendFiles(__dirname + "../img/" + image.name);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
