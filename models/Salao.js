const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const salaoSchema = new mongoose.Schema({
    nome: { type: String, required: [true, "Nome do salão é obrigatório"] },
    localizacao: {},
    horario: { type: [Number], required: [true, "Horário é obrigatório"] },
    telefone: String,
    email: { type: String, required: [true, "Email é obrigatório"] },
    senha: { type: String, required: [true, "Senha é obrigatória"]},
    imagem: String,
    createAt: { type: Date, default: Date.now() }
});

salaoSchema.pre("save", async function (next) {
    const salao = this;
    try {
        const salt = await bcrypt.genSalt(12);
        salao.senha = await bcrypt.hash(salao.senha, salt);
    } catch (err) {
        return next(err);
    }
});

salaoSchema.pre("findOneAndUpdate", async function (next) {
    const salao = this.getUpdate();
    if (salao.senha) {
        try {
            const salt = await bcrypt.genSalt(12);
            salao.senha = await bcrypt.hash(salao.senha, salt);
        } catch (err) {
            return next(err);
        }
    }
    return next();
});

module.exports = mongoose.model('Salao', salaoSchema);