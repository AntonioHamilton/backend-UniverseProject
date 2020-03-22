const mongoose = require("mongoose");

const buracoNegro = new mongoose.Schema({
  url_imagem: {
    type: String,
    default:
      "https://1.bp.blogspot.com/-MfbWV6LIQvM/XWchxemK0YI/AAAAAAAAaTc/rFVFl4o0nx4oK-J6iys_IXcRLLf73IUiQCK4BGAYYCw/s640/Black-hole-news-NASA-clocked-black-holes-early-universe-Chandra-Xray-NASA-news-1163973.jpg"
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
  }
});

module.exports = mongoose.model("BuracoNegro", buracoNegro);
