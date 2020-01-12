const mongoose = require('mongoose');

const GiganteAzulSchema = new mongoose.Schema ({
    url_imagem: {
        type: String,
        default: 'http://www.clandestina.com.br/images/default.png'
    },
    nome: {
        type: String,
        required: true,
        unique: true
    },
    tamanho: {
        type: String,
        default: 'Sem informação'
    },

    massa: {
        type: String,
        default: 'Sem informação'
    }

})

module.exports = mongoose.model("GiganteAzul", GiganteAzulSchema);