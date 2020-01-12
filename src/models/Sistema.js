const mongoose = require('mongoose');

const SistemaSchema = new mongoose.Schema ({
    url_imagem: {
        type: String,
        default: 'http://www.clandestina.com.br/images/default.png'
    },
    nome: {
        type: String,
        required: true,
        unique: true
    },
    quantidade_planetas: {
        type: Number,
        default: 0
    },

    quantidade_estrelas: {
        type: Number,
        default: 0
    },
    idade: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model("Sistema", SistemaSchema);