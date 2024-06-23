const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Role = require("../enums/Role");
const Genero = require("../enums/Genero");

const EnderecoSchema = new mongoose.Schema({
  provincia: {
    type: String,
    required: true,
  },
  municipio: { type: String, required: true },
  bairro: { type: String, required: true },
  rua: { type: String, required: true },
  casa: { type: String, required: true },
});
const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  genero: {
    type: String,
    Enumerator: Genero,
    required: true,
  },
  dataNascimento: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  telefone: { type: String, required: true },
  endereco: { type: EnderecoSchema },
  imagem: { type: String, required: true },
  senha: { type: String, required: true },
  role: {
    type: String,
    Enumerator: Role,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UsuarioSchema.pre("save", async function (next) {
  const usuario = this;
  if (!usuario.isModified("senha")) return next();
  try {
    const salt = await bcrypt.genSalt();
    usuario.senha = await bcrypt.hash(usuario.senha, salt);
  } catch (err) {
    return next(err);
  }
});
UsuarioSchema.methods.compareSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};
module.exports = mongoose.model("Usuario", UsuarioSchema);
