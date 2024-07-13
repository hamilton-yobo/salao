const express = require("express");
const authController = require("../../controllers/auth/authController");
const router = express.Router();

router.post("/login", authController.login);
router.get("/refresh", authController.refreshToken);
router.get("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);

module.exports = router;
