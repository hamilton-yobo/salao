const express = require("express");
const Usuario = require("./../models/Usuario");
const router = express.Router();
const userController = require("../controllers/usuarios/usuarioController");

router.get("/", userController.getUsuario);

router.get("/:id", userController.getUsuarioById);

router.post("/", userController.createUsuario);

router.patch('/:id', userController.updateUsuario);

router.delete("/:id", userController.deleteUsuario);

module.exports = router;
