const mongoose = require('mongoose');

const AnaVermelhaSchema = new mongoose.Schema ({
    nome: {
        type: String,
        required: true,
        unique: true
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

module.exports = mongoose.model("AnaVermelha", AnaVermelhaSchema);