const mongoose = require('mongoose');

const SistemaSchema = new mongoose.Schema ({
    nome: {
        type: String,
        required: true,
        unique: true
    },

    quantidade_planetas: {
        type: Number,
        required: true
    },

    quantidade_estrelas: {
        type: Number,
        required: true
    },
    
    idade: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model("Sistema", SistemaSchema);