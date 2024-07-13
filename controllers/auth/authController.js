const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");
const crypto = require("crypto");
const dotenv = require("dotenv").config();
const authConfig = require("./../../config/auth.json");
const Usuario = require("./../../models/Usuario");
const mailer = require("../../modules/mailer");

const login = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email }).select("+senha");

  if (!usuario) res.status(404).json({ msg: "Utilizador não encontrado" });

  if (!(await bcrypt.compare(senha, usuario.senha)))
    res.status(400).json({ msg: "Senha incorreta" });
  usuario.senha = undefined;
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

  await Usuario.findByIdAndUpdate(usuario._id, { refreshToken: refreshToken });
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ usuario, token: accessToken });
};
const refreshToken = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const usuario = Usuario.findOne({ refreshToken });
  if (!usuario) res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || usuario.id !== decoded.id) res.sendStatus(403);
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 30 }
    );
    res.status(200).json({ token: accessToken });
  });
};
const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const usuario = Usuario.findOne({ refreshToken });
  if (!usuario) {
    res.clearCookie("jwt", { httpOnly: true });
    res.sendStatus(204);
  }
  await Usuario.findByIdAndUpdate(usuario._id, { refreshToken: undefined });
  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) res.status(404).json({ msg: "Utilizador não encontrado" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 2);
    await Usuario.findByIdAndUpdate(usuario.id, {
      $set: {
        passwordResetToken: resetToken,
        passwordResetExpires: now,
      },
    });
    mailer.sendMail(
      {
        to: email,
        from: "elton.kamuango@gmail.com",
        subject: "Pedido de reposição de senha",

        //template: "test.html",
        html:
          "<p>Você requisitou uma alteração de palavra-passe. Se confirma esta ação, por favor, use esse token: " +
          resetToken +
          "</p>", //"/auth/forgot_password",
        context: { resetToken },
      },
      (err) => {
        if (err)
          return res.status(400).json({
            msg: "Ocorreu um erro, tente novamente mais tarde.",
          });
        res.send();
      }
    );
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "Ocorreu um erro, tente novamente mais tarde." });
  }
};
const resetPassword = async (req, res, next) => {
  const { email, token, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );

    if (!usuario) res.status(404).json({ msg: "Utilizador não encontrado" });

    if (token !== usuario.passwordResetToken)
      res.status(400).json({ msg: "O token fornecido é inválido" });
    const now = new Date();
    if (now > usuario.passwordResetExpires)
      res
        .status(400)
        .json({ msg: "O token fornecido está expirado, gere um novo!" });

    usuario.senha = senha;
    await usuario.save();
    res.send();
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "Ocorreu um erro, tente novamente mais tarde." });
  }
};

module.exports = { login, refreshToken, logout, forgotPassword, resetPassword };
