const mongoose = require('mongoose');

const EstrelaSchema = new mongoose.Schema ({
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