const mongoose = require("mongoose");

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
const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  genero: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  telefone: { type: String, required: true },
  endereco: EnderecoSchema,
  imagem: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cliente", ClienteSchema);
