const mongoose = require("mongoose");

const SateliteSchema = new mongoose.Schema({
  url_imagem: {
    type: String,
    default: "http://www.clandestina.com.br/images/default.png"
  },
  nome: {
    type: String,
    required: true,
    unique: true
  },
  composicao: {
    type: String,
    default: "Sem informação"
  },
  tamanho: {
    type: String,
    default: "Sem informação"
  },
  massa: {
    type: String,
    default: "Sem informação"
  },
  orbita: {
    type: String,
    default: "Sem informação"
  },
  tipoOrbita: {
    type: String,
    enum: ["estrela", "planeta"]
  }
});

module.exports = mongoose.model("Satelite", SateliteSchema);
