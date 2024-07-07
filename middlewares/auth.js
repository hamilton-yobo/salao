const jwt = require("jsonwebtoken");
const authConfig = require("./../config/auth.json");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ msg: "Token não fornecido" });
  const parts = authHeader.split(" ");
  if (!parts.length === 2)
    return res.status(401).json({ msg: "Erro no token" });
  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ msg: "Token Mal formatado" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: err });
    req.usuarioId = decoded.id;

    return next();
  });
};
