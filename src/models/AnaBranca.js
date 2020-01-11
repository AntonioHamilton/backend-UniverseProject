const mongoose = require('mongoose');

const AnaBrancaSchema = new mongoose.Schema ({
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

module.exports = mongoose.model("AnaBranca", AnaBrancaSchema);