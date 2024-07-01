const mongoose = require('mongoose');

const colaboradorSalao = new mongoose.Schema({
    colaboradorId: {
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: [true, "Id do colaborador é obrigatório"]
    },
    salaoId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: [true, "Id do salão é obrigatório"]
    },
    status: {
        type: String,
        enum: ['A', 'E', 'I'], // A - Activo, E - Excluido, I - Inativo
        default: 'A',
        required: [true, "Status é obrigatório"]
    },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('ColaboradorSalao', colaboradorSalao);