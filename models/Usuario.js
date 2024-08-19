const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Genero = require("../enums/Genero");
const Provincia = require("../enums/Provincia");
const Role = require("../enums/Role");

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: [true, 'Deve preencher o campo "Nome"'] },
  sobrenome: {
    type: String,
    required: [true, 'Deve preencher o campo "Sobrenome"'],
  },
  genero: {
    type: String,
    enum: [Genero],
    required: true,
    default: Genero.M,
  },
  dataNascimento: {
    type: String,
    required: [true, "Deve informe a data de nascimento"],
  },
  email: { type: String, required: [true, 'Deve preencher o campo "Email"'] },
  telefone: String,
  senha: { type: String, required: [true, 'Deve preencher o campo "Senha"'] },
  endereco: {
    type: Object,
    bairro: String,
    provincia: {
      type: String,
      enum: [Provincia],
      required: [true, "Deve informar a provincia onde reside"],
      default: Provincia.Luanda,
    },
  },
  imagem: String,
  role: {
    type: String,
    enum: [Role],
    required: true,
    default: "CLIENTE",
  },
  refreshToken: {
    type: String,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
usuarioSchema.pre("save", async function (next) {
  const usuario = this;
  try {
    const salt = await bcrypt.genSalt(12);
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
  } catch (err) {
    return next(err);
  }
});

usuarioSchema.pre("findOneAndUpdate", async function (next) {
  const atualizacao = this.getUpdate();
  if (atualizacao.senha) {
    try {
      const salt = await bcrypt.genSalt(12);
      atualizacao.senha = await bcrypt.hash(atualizacao.senha, salt);
    } catch (err) {
      return next(err);
    }
  }
  return next();
});

module.exports = mongoose.model("Usuario", usuarioSchema);
