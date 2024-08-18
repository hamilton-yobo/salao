// const express = require("express");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const authConfig = require("./../../config/auth.json");
const Usuario = require("./../../models/Usuario");
// const router = express.Router();

const getUsuario = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getUsuarioById = async (req, res) => {
  let usuario;
  try {
    usuario = await Usuario.findById(req.params.id);
    if (usuario == null) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    return res.status(404).json(usuario);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createUsuario = async (req, res) => {
  const usuario = new Usuario({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    genero: req.body.genero,
    dataNascimento: req.body.dataNascimento,
    email: req.body.email,
    telefone: req.body.telefone,
    imagem: req.body.imagem,
    senha: req.body.senha,
    role: req.body.role,
  });

  try {
    const existeUsuario = await Usuario.findOne({ email: usuario.email });
    if (existeUsuario != null) {
      res.status(400).json({ msg: "O email inserido não está disponível" });
    } else {
      const novoUsuario = await usuario.save();

      const accessToken = jwt.sign(
        { id: usuario._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 30,
        }
      );
      const refreshToken = jwt.sign(
        { id: usuario._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: 86400,
        }
      );
      await Usuario.findByIdAndUpdate(novoUsuario._id, {
        refreshToken: refreshToken,
      });
      novoUsuario.senha = undefined;

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ novoUsuario, token: accessToken });
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const {
      nome,
      sobrenome,
      genero,
      dataNascimento,
      email,
      telefone,
      senha,
      endereco,
      imagem,
      role,
    } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      usuarioId,
      {
        nome,
        sobrenome,
        genero,
        dataNascimento,
        email,
        telefone,
        senha,
        endereco,
        imagem,
        role,
      },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.status(201).json(usuarioActualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Erro ao atualizar usuário." });
  }
};

const deleteUsuario = async (req, res) => {
  let usuario;
  try {
    usuario = await Usuario.findById(req.params.id);
    if (usuario == null) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Eliminado!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getUsuario,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
