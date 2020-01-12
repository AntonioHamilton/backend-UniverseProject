const mongoose = require('mongoose');

const EstrelaSchema = new mongoose.Schema ({
    url_imagem: {
        type: String,
        default: 'http://www.clandestina.com.br/images/default.png'
    },
    idade: {
        type: Number,
        required: true
    },
    distancia_terra: {
        type: String,
        required: true
    },

    gravidade: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Estrela", EstrelaSchema);