const mongoose = require('mongoose');

const GalaxiaSchema = new mongoose.Schema ({
    url_imagem: {
        type: String,
        default: 'http://www.clandestina.com.br/images/default.png'
    },
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