const mongoose = require('mongoose')

const PlanetaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    }
})