const mongoose = require("mongoose");

const PlanetaSchema = new mongoose.Schema({
  url_imagem: {
    type: String,
    default: "http://www.clandestina.com.br/images/default.png"
  },
  nome: {
    type: String,
    required: true,
    unique: true
  },
  tamanho: {
    type: String,
    default: "Sem informação"
  },

  massa: {
    type: String,
    default: "Sem informação"
  },

  gravidade: {
    type: String,
    default: "Sem informação"
  },
  composicao: {
    type: String,
    default: "Sem informação"
  },
  sistemas: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Planeta", PlanetaSchema);
