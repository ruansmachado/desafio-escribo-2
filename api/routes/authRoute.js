const AuthController = require("../controllers/authController");

const { Router } = require("express");

const router = Router();

router.post("/auth/login", AuthController.login);

module.exports = router;
