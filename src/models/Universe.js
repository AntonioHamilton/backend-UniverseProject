const mongoose = require('mongoose');

const UniverseSchema = new mongoose.Schema ({
    nome: {
        type: String,
        unique: true,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "Sem informação"
    },
    luas: {
        type: Array,
        default: "Sem informação"
    },
    galaxia: {
        type: String,
        default: "Sem informação"
    },
    area: {
        type: String,
        default: "Sem informação"
    },
    volume: {
        type: String,
        default: "Sem informação"
    },
    massa: {
        type: String,
        default: "Sem informação"
    },
    gravidade: {
        type: String,
        default: "Sem informação"
    },
    temperatura: {
        type: String,
        default: "Sem informação"
    },
    curiosidades: {
        type: String,
        default: "Sem informação"
    }
})

module.exports = mongoose.model("Universe", UniverseSchema);