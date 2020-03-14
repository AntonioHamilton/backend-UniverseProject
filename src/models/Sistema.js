const mongoose = require("mongoose");

const SistemaSchema = new mongoose.Schema({
  url_imagem: {
    type: String,
    default: "http://www.clandestina.com.br/images/default.png"
  },
  nome: {
    type: String,
    required: true,
    unique: true
  },
  quantidade_planetas: {
    type: Number,
    default: 0
  },
  quantidade_estrelas: {
    type: Number,
    default: 0
  },
  idade: {
    type: Number,
    default: 0
  },
  galaxia: {
    type: String,
    required: true
  },
  planetas: {
    type: Array,
    default: []
  },
  estrelas: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Sistema", SistemaSchema);
