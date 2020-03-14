const Planeta = require("../models/Planeta");
const Sistema = require("../models/Sistema");
const SistemaController = require("../Controllers/SistemaController");
var resposta = { status: x => ({ send: x => console.log(x) }) };
module.exports = {
  /*1*/
  async Create(req, res) {
    const {
      nome: nome_planeta,
      tamanho,
      massa,
      gravidade,
      composicao,
      url_imagem,
      sistema,
      galaxia
    } = req.body;
    await Planeta.create({
      nome: nome_planeta,
      tamanho,
      massa,
      gravidade,
      composicao,
      url_imagem,
      sistema
    })
      .then(async response => {
        //RELAÇÃO PLANETA - SISTEMA
        const search = await Sistema.findOne({ nome: sistema });
        if (search) {
          search.planetas = [...search.planetas, nome_planeta];
          await Sistema.findOneAndUpdate(
            {
              nome: search.nome
            },
            {
              planetas: search.planetas,
              quantidade_planetas: search.quantidade_planetas.length
            }
          );
        } else {
          await SistemaController.Create(
            {
              body: {
                nome: sistema,
                planetas: [nome_planeta],
                quantidade_planetas: 1,
                galaxia
              }
            },
            resposta
          );
        }
        //FIM RELAÇÃO PLANETA - SISTEMA
        return res.status(200).send("Criado um novo  Planeta!");
      })
      .catch(err => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(500).send("Esse Planeta já existe no banco!");
        }
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*2*/
  async Read(req, res) {
    const planeta = await Planeta.find().select({ __v: 0 });
    return res.status(200).json(planeta);
  },

  /*3*/
  async Update(req, res) {
    const { nome } = req.params;
    const info = req.body;
    //RELAÇÃO SISTEMA - PLANETA
    if (info.nome) {
      let planeta = await sistema.findOne({ nome });
      let sistema = await Sistema.findOne({ nome: planeta.sistema });
      sistema.planetas.splice(sistema.planetas.indexOf(nome), 1);
      sistema.planetas.push(info.nome);
      await SistemaController.Update(
        {
          params: { nome: planeta.sistema },
          body: {
            planetas: sistema.planetas
          }
        },
        resposta
      );
    }
    //FIM RELAÇÃO SISTEMA - PLANETA
    await Planeta.findOneAndUpdate({ nome }, { $set: info })
      .then(response => {
        return res.status(200).send("Planeta atualizada!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*4*/
  async Delete(req, res) {
    const { nome } = req.params;
    //RELAÇÃO PLANETA - SISTEMA
    const planeta = await Planeta.findOne({
      nome
    });
    //FIM RELAÇÃO PLANETA - SISTEMA
    await Planeta.findOneAndDelete({ nome })
      .then(async response => {
        const search = await Sistema.findOne({
          nome: planeta.sistema
        });
        //RELAÇÃO PLANETA - SISTEMA
        await SistemaController.Update(
          {
            params: { nome: planeta.sistema },
            body: {
              planetas: search.planetas.splice(
                search.planetas.indexOf(nome),
                1
              ),
              quantidade_planetas: search.planetas.length
            }
          },
          resposta
        );
        //FIM RELAÇÃO PLANETA - SISTEMA
        return res.status(200).send("Planeta deletado!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  }
};
