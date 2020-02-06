const mongoose = require('mongoose')

const PacientesSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    dataNasc: {
        type: String,
        required: true
    }
})

const Pacientes = mongoose.model('Pacientes', PacientesSchema)

module.exports = Pacientes;