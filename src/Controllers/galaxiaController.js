const Galaxia = require("../models/Galaxia");
const Sistema = require("../models/Sistema");

module.exports = {
  /*1*/
  async Create(req, res) {
    let sistemas = [];
    const { nome, quantidade_sistemas, distancia_terra, url_imagem } = req.body;
    await Galaxia.create({
      nome,
      quantidade_sistemas,
      distancia_terra,
      url_imagem,
      sistemas
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
    await Galaxia.findOneAndUpdate({ nome }, { $set: info })
      .then(response => {
        req.io.emit("galaxia", response);
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
    let galaxias = await Galaxia.findOne({ nome });
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
