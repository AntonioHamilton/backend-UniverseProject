const mongoose = require('mongoose');

const SateliteSchema = new mongoose.Schema ({
    nome: {
        type: String,
        required: true,
        unique: true
    },

    composicao: {
        type: String,
        required: true
    },

    tamanho: {
        type: String,
        required: true
    },

    massa: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("Satelite", SateliteSchema);