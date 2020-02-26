const Sistema = require("../models/Sistema");
const Galaxia = require("../models/Galaxia");
module.exports = {
  /*1*/
  async Create(req, res) {
    const {
      nome: nome_sistema,
      quantidade_planetas,
      quantidade_estrelas,
      idade,
      url_imagem,
      galaxia
    } = req.body;
    const Galaxias = await Galaxia.find();
    let confirm = false;
    Galaxias.map(item => {
      if (item.nome == galaxia) {
        confirm = true;
      }
    });
    if (confirm) {
      newSistemas = await Galaxia.findOne({ nome: galaxia });
      newSistemas = newSistemas.sistemas;
      newSistemas.push(nome_sistema);
      await Galaxia.findOneAndUpdate(
        { nome: galaxia },
        {
          sistemas: newSistemas
        }
      );
    } else {
      await Galaxia.create({
        nome: galaxia,
        sistemas: [nome_sistema]
      });
    }
    await Sistema.create({
      nome: nome_sistema,
      quantidade_planetas,
      quantidade_estrelas,
      idade,
      url_imagem,
      galaxia
    })
      .then(response => {
        return res.status(200).send("Criado um novo Sistema!");
      })
      .catch(err => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(500).send("Esse Sistema já existe no banco!");
        }
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*2*/
  async Read(req, res) {
    const sistema = await Sistema.find().select({ __v: 0 });
    return res.status(200).json(sistema);
  },

  /*3*/
  async Update(req, res) {
    const { nome } = req.params;
    const info = req.body;
    if (info.nome) {
      let response = await Sistema.findOne({ nome });
      let galaxia = response.galaxia;
      let novaGalaxia = await Galaxia.findOne({ nome: galaxia });
      let novoSistema = novaGalaxia.sistemas;
      novoSistema.splice(novoSistema.indexOf(nome), 1);
      novoSistema.push(info.nome);
      await Galaxia.findOneAndUpdate(
        { nome: galaxia },
        { sistemas: novoSistema }
      );
    }
    await Sistema.findOneAndUpdate({ nome }, { $set: info })
      .then(response => {
        req.io.emit("Sistema", response);
        return res.status(200).send("Sistema atualizada!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*4*/
  async Delete(req, res) {
    const { nome } = req.params;
    let response = await Sistema.findOne({ nome });
    let galaxia = response.galaxia;
    let novaGalaxia = await Galaxia.findOne({ nome: galaxia });
    let novoSistema = novaGalaxia.sistemas;
    novoSistema.splice(novoSistema.indexOf(nome), 1);
    await Galaxia.findOneAndUpdate(
      { nome: galaxia },
      { sistemas: novoSistema }
    );
    await Sistema.findOneAndDelete({ nome })
      .then(response => {
        return res.status(200).send("Sistema deletado!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  }
};
