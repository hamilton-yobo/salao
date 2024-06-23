const express = require("express");
const usuariosRouter = require("./routes/usuarios");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

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

app.use("/usuarios", usuariosRouter);
app.get("/", function (req, res) {
  res.status(200).json({ msg: "Seja benvindo ao servidor do Salão" });
});

app.listen(3000, function () {
  console.log("Servidor está no ar! Na porta: " + process.env.PORT);
});
