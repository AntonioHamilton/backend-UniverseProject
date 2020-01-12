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