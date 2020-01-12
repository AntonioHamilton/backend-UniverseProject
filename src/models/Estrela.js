const mongoose = require('mongoose');

const EstrelaSchema = new mongoose.Schema ({
    id: {
        type: String,
        required: true,
        unique: true   
    },
    url_imagem: {
        type: String,
        default: 'http://www.clandestina.com.br/images/default.png'
    },
    idade: {
        type: Number,
        default: 0
    },
    distancia_terra: {
        type: String,
        default: 'Sem informação'
    },

    gravidade: {
        type: String,
        default: 'Sem informação'
    }
})

module.exports = mongoose.model("Estrela", EstrelaSchema);