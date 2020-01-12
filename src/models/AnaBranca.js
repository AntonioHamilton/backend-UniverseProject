const mongoose = require('mongoose');

const AnaBrancaSchema = new mongoose.Schema ({
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
        required: true
    },

    massa: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("AnaBranca", AnaBrancaSchema);