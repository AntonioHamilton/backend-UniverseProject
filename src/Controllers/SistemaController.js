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

    await Sistema.create({
      nome: nome_sistema,
      quantidade_planetas,
      quantidade_estrelas,
      idade,
      url_imagem,
      galaxia
    })
      .then(async response => {
        let confirm = false;
        const galaxias = await Galaxia.find();
        galaxias.forEach(item => {
          if (item.nome === galaxia) {
            confirm = true;
          }
        });
        if (confirm) {
          const { sistemas } = await Galaxia.findOne({ nome: galaxia });
          await Galaxia.findOneAndUpdate(
            { nome: galaxia },
            {
              sistemas: [...sistemas, nome_sistema]
            }
          );
        } else {
          await Galaxia.create({
            nome: galaxia,
            sistemas: [nome_sistema]
          });
        }
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
    const sistema = await Sistema.find();
    console.log(sistema);
    return res.status(200).send(sistema);
  },

  /*3*/
  async Update(req, res) {
    const { nome } = req.params;
    const info = req.body;
    await Sistema.findOneAndUpdate({ nome }, { $set: info })
      .then(async response => {
        if (info.nome) {
        }
        if (info.galaxia) {
        }
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
