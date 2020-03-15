const Planeta = require("../models/Planeta");
const Sistema = require("../models/Sistema");
const Estrela = require("../models/Estrela");
const Satelite = require("../models/Satelite");
const EstrelaController = require("../Controllers/EstrelaController");
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
      galaxia,
      orbita,
      orbitado
    } = req.body;
    await Planeta.create({
      nome: nome_planeta,
      tamanho,
      massa,
      gravidade,
      composicao,
      url_imagem,
      sistema,
      orbita,
      orbitado
    })
      .then(async response => {
        //RELAÇÃO PLANETA - SISTEMA
        let search = await Sistema.findOne({ nome: sistema });
        if (search) {
          search.planetas = [...search.planetas, nome_planeta];
          await Sistema.findOneAndUpdate(
            {
              nome: search.nome
            },
            {
              planetas: search.planetas,
              quantidade_planetas: search.planetas.length
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
        //RELAÇÃO PLANETA - ESTRELA
        orbita.map(async item => {
          let search1 = await Estrela.findOne({ nome: item });
          if (search1) {
            await EstrelaController.Update(
              {
                params: { nome: item },
                body: {
                  orbitada: [...search1.orbitada, nome_planeta]
                }
              },
              resposta
            );
          } else {
            await EstrelaController.Create(
              {
                body: {
                  nome: item,
                  sistema,
                  galaxia,
                  orbitada: [nome_planeta]
                }
              },
              resposta
            )
              .then(() => "nada")
              .catch(err => console.log(err));
          }
        });
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

    if (info.nome) {
      let planeta = await sistema.findOne({ nome });
      //RELAÇÃO SISTEMA - PLANETA
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
      //FIM RELAÇÃO SISTEMA - PLANETA
      //RELAÇÃO PLANETA - ESTRELA - SATELITE
      planeta.orbita.map(async item => {
        let estrela = await Estrela.findOne({ nome: item });
        if (info.nome && estrela) {
          estrela.orbitada.splice(estrela.orbitada.indexOf(nome), 1);
          estrela.orbitada.push(info.nome);
          await EstrelaController.Update(
            {
              params: { nome: item },
              body: {
                orbitada: estrela.orbitada
              }
            },
            resposta
          );
        } else if (info.nome) {
          await require("../Controllers/SateliteController").Update(
            {
              params: { nome: item },
              body: {
                orbita: info.nome
              }
            },
            resposta
          );
        }
      });
      //FIM RELAÇÃO PLANETA - ESTRELA - SATELITE
    }

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
        //RELAÇÃO PLANETA - SISTEMA
        let search = await Sistema.findOne({
          nome: planeta.sistema
        });
        search.planetas.splice(search.planetas.indexOf(nome), 1);
        await SistemaController.Update(
          {
            params: { nome: planeta.sistema },
            body: {
              planetas: search.planetas,
              quantidade_planetas: search.planetas.length
            }
          },
          resposta
        );
        //FIM RELAÇÃO PLANETA - SISTEMA
        //RELAÇÃO PLANETA - ESTRELA
        planeta.orbita.map(async item => {
          let search1 = await Estrela.findOne({ nome: item });
          search1.orbitada.splice(search1.orbitada.indexOf(item), 1);
          await EstrelaController.Update(
            {
              params: { nome: item },
              body: {
                orbitada: search1.orbitada
              }
            },
            resposta
          );
        });
        //FIM RELAÇÃO PLANETA - ESTRELA
        //RELAÇÃO PLANETA - SATELITE
        planeta.orbitado.map(async item => {
          await require("../Controllers/SateliteController").Update(
            {
              params: { nome: item },
              body: {
                orbita: "Desconhecida"
              }
            },
            resposta
          );
        });
        //FIM RELAÇÃO PLANETA - SATELITE
        return res.status(200).send("Planeta deletado!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  }
};
