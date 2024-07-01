const express = require("express");
const usuariosRouter = require("./routes/usuarios");
const salaoRouter = require("./routes/salao");
const servicosRouter = require("./routes/servicos");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require('morgan');

const app = express();
dotenv.config();
mongoose.connect(process.env.DATABASE, {
  autoIndex: true,
});
const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Conexão estabelecida");
});
app.use(express.json());
app.use(morgan('dev')); // Middleware para exibição de logs de requisições no terminal

app.use("/usuarios", usuariosRouter);
app.use("/salao", salaoRouter);
app.use("/servico", servicosRouter);
app.get("/", function (req, res) {
  res.status(200).json({ msg: "Seja benvindo ao servidor do Salão" });
});

app.listen(3000, function () {
  console.log("Servidor está no ar! Na porta: " + process.env.PORT);
});
