const Estrela = require("../models/Estrela");
const Sistema = require("../models/Sistema");
const SistemaController = require("../Controllers/SistemaController");
var resposta = { status: x => ({ send: x => console.log(x) }) };
module.exports = {
  /*1*/
  async Create(req, res) {
    const {
      nome,
      tamanho,
      idade,
      distancia_terra,
      gravidade,
      url_imagem,
      id,
      sistema
    } = req.body;
    await Estrela.create({
      nome,
      tamanho,
      idade,
      distancia_terra,
      gravidade,
      url_imagem,
      id,
      sistema
    })
      .then(async response => {
        //RELAÇÃO ESTRELA - SISTEMA
        const search = await Sistema.findOne({ nome: sistema });
        if (search) {
          search.estrelas = [...search.planetas, nome_planeta];
          await Sistema.findOneAndUpdate(
            {
              nome: search.nome
            },
            {
              planetas: search.planetas,
              quantidade_estrelas: search.quantidade_estrelas.length
            }
          );
        } else {
          await SistemaController.Create(
            {
              body: {
                nome: sistema,
                estrelas: [nome_planeta],
                quantidade_estrelas: 1,
                galaxia
              }
            },
            resposta
          );
        }
        //FIM RELAÇÃO ESTRELA - SISTEMA
        return res.status(200).send("Criado uma nova Estrela!");
      })
      .catch(err => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(500).send("Esse Estrela já existe no banco!");
        }
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*2*/
  async Read(req, res) {
    const estrela = await Estrela.find().select({ __v: 0 });
    return res.status(200).json(estrela);
  },

  /*3*/
  async Update(req, res) {
    const { nome } = req.params;
    const info = req.body;
    //RELAÇÃO ESTRELA - SISTEMA
    if (info.nome) {
      let estrela = await sistema.findOne({ nome });
      let sistema = await Sistema.findOne({ nome: estrela.sistema });
      sistema.estrelas.splice(sistema.estrelas.indexOf(nome), 1);
      sistema.estrelas.push(info.nome);
      await SistemaController.Update(
        {
          params: { nome: estrela.sistema },
          body: {
            planetas: sistema.estrelas
          }
        },
        resposta
      );
    }
    //FIM RELAÇÃO ESTRELA - SISTEMA
    await Estrela.findOneAndUpdate({ nome }, { $set: info })
      .then(response => {
        return res.status(200).send("Estrela atualizada!");
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
    const estrela = await Estrela.findOne({
      nome
    });
    //FIM RELAÇÃO PLANETA - SISTEMA
    await Estrela.findOneAndDelete({ nome })
      .then(async response => {
        //RELAÇÃO PLANETA - SISTEMA
        await SistemaController.Update(
          {
            params: { nome: estrela.sistema },
            body: {
              estrelas: search.estrelas.splice(
                search.estrelas.indexOf(nome),
                1
              ),
              quantidade_estrelas: search.estrelas.length
            }
          },
          resposta
        );
        //FIM RELAÇÃO PLANETA - SISTEMA
        return res.status(200).send("Estrela deletada!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  }
};
