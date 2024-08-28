const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");

const authMiddleware = require("../middleware/auth-middleware");
const bodyParser = require("body-parser");
const multer = require("multer");
const isAuth = require("../middleware/isAuth.js");

const projectController = require("../controllers/project-controler.js");

const router = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(" ", "-"));
  },
});

const uploadOptions = multer({ storage: storage });

router.post(
  "/registration",
  body("name").isLength({ min: 3, max: 24 }),
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 24 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activation/:link", userController.activation);
router.get("/refresh", userController.refresh);
router.get("/checkAuth", userController.checkAuth);
router.post("/updUser", uploadOptions.any("avatar"), userController.updUser);

router.post("/project", projectController.createProject);
router.post("/upProject", uploadOptions.any("avatar"), projectController.updateProject);
router.get("/projectOne/:id", projectController.getProject);
router.get("/projectAll/:id", projectController.getAllProjects);
router.delete("/project/:id", projectController.delete)

module.exports = router;
