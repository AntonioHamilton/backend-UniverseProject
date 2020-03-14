const Galaxia = require("../models/Galaxia");
const Sistema = require("../models/Sistema");

module.exports = {
  /*1*/
  async Create(req, res) {
    const { nome, quantidade_sistemas, distancia_terra, url_imagem } = req.body;
    await Galaxia.create({
      nome,
      quantidade_sistemas,
      distancia_terra,
      url_imagem
    })
      .then(response => {
        return res.status(200).send("Criado uma nova galáxia!");
      })
      .catch(err => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(500).send("Esse galáxia já existe no banco!");
        }
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*2*/
  async Read(req, res) {
    const galaxia = await Galaxia.find().select({ __v: 0 });
    return res.status(200).json(galaxia);
  },

  /*3*/
  async Update(req, res) {
    const { nome } = req.params;
    const info = req.body;
    //RELAÇÃO GALAXIA - SISTEMA
    if (info.nome) {
      let galaxias = await Galaxia.findOne({ nome });
      galaxias.sistemas.map(async item => {
        let sistema = await Sistema.findOne({ nome: item });
        sistema.galaxia = info.nome;
        let galaxia = sistema.galaxia;
        await Sistema.findOneAndUpdate({ nome: item }, { galaxia });
      });
    }
    //FIM RELAÇÃO GALAXIA - SISTEMA
    await Galaxia.findOneAndUpdate({ nome }, { $set: info })
      .then(response => {
        return res.status(200).send("Galáxia atualizada!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*4*/
  async Delete(req, res) {
    const { nome } = req.params;
    //RELAÇÃO GALAXIA - SISTEMA
    let galaxias = await Galaxia.findOne({ nome });
    galaxias.sistemas.map(async item => {
      await Sistema.findOneAndDelete({ nome: item });
    });
    //FIM RELAÇÃO GALAXIA - SISTEMA
    await Galaxia.findOneAndDelete({ nome })
      .then(response => {
        return res.status(200).send("Galáxia deletada!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  }
};
