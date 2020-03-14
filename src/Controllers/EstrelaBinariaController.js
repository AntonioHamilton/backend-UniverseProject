const EstrelaBinaria = require("../models/EstrelaBinaria");

module.exports = {
  /*1*/
  async Create(req, res) {
    const { nome, tamanho, massa, url_imagem } = req.body;
    await EstrelaBinaria.create({
      nome,
      quantidade_sistemas,
      distancia_terra,
      url_imagem
    })
      .then(response => {
        return res.status(200).send("Criado uma nova Estrela Binaria!");
      })
      .catch(err => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(500).send("Essa Estrela Binaria já existe!");
        }
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*2*/
  async Read(req, res) {
    const estrelaBinaria = await EstrelaBinaria.find().select({ __v: 0 });
    return res.status(200).json(estrelaBinaria);
  },

  /*3*/
  async Update(req, res) {
    const { nome } = req.params;
    const info = req.body;
    await EstrelaBinaria.findOneAndUpdate({ nome }, { $set: info })
      .then(response => {
        return res.status(200).send("Estrela Binaria atualizada!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*4*/
  async Delete(req, res) {
    const { nome } = req.params;
    await EstrelaBinaria.findOneAndDelete({ nome })
      .then(response => {
        return res.status(200).send("Estrela Binaria deletada!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  }
};
