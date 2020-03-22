const mongoose = require("mongoose");

const EstrelaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  tamanho: {
    type: String
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  url_imagem: {
    type: String,
    default: "http://www.clandestina.com.br/images/default.png"
  },
  idade: {
    type: Number,
    default: 0
  },
  distancia_terra: {
    type: String,
    default: "Sem informação"
  },
  sistema: {
    type: String,
    required: true
  },
  orbitada: {
    type: Array,
    default: []
  },
  tipo: {
    type: String,
    enum: [
      "Anã Vermelha",
      "Anã Branca",
      "Gigante Azul",
      "Estrela Binária",
      "Gigante Vermelha"
    ]
  }
});

module.exports = mongoose.model("Estrela", EstrelaSchema);
