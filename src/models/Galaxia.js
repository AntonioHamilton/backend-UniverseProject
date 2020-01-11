const mongoose = require('mongoose');

const GalaxiaSchema = new mongoose.Schema ({
    nome: {
        type: String,
        required: true,
        unique: true
    },

    quantidade_sistemas: {
        type: Number,
        required: true
    },

    distancia_terra: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Galaxia", GalaxiaSchema);