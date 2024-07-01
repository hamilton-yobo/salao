const mongoose = require('mongoose');

const servicoSchema = new mongoose.Schema({
    salaoId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    colaboradorId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        default: null
    }],
    tipo: { type: String, required: [true, "Tipo de serviço é obrigatório"] },
    duracao: { type: String, required: [true, "Duração é obrigatório"] },
    valor: { type: Number, required: [true, "Valor é obrigatório"] },
    status: {
        type: String,
        enum: ['A','I','E'],
        required: true,
        default: 'A'
    }
});

module.exports = mongoose.model('Servico', servicoSchema);