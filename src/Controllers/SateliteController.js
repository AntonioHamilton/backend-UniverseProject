const Satelite = require("../models/Satelite");
const Planeta = require("../models/Planeta");
const PlanetaController = require("../Controllers/PlanetaController");
const Estrela = require("../models/Estrela");
const EstrelaController = require("../Controllers/EstrelaController");
var resposta = { status: x => ({ send: x => console.log(x) }) };
module.exports = {
  /*1*/
  async Create(req, res) {
    const {
      nome,
      tamanho,
      massa,
      composicao,
      url_imagem,
      orbita,
      tipoOrbita
    } = req.body;
    await Satelite.create({
      nome,
      tamanho,
      massa,
      composicao,
      url_imagem,
      orbita,
      sistema,
      galaxia,
      tipoOrbita
    })
      .then(async response => {
        //RELAÇÃO PLANETA - SATELITE - ESTRELA
        let searchPlaneta = await Planeta.findOne({ nome: orbita });
        let searchEstrela = await Planeta.findOne({ nome: orbita });
        if (tipoOrbita === "planeta") {
          if (searchPlaneta) {
            await PlanetaController.Update(
              {
                params: { nome: orbita },
                body: {
                  orbitado: [...searchPlaneta.orbitado, nome]
                }
              },
              resposta
            );
          } else {
            await PlanetaController.Create(
              {
                body: {
                  nome: orbita,
                  sistema,
                  galaxia,
                  orbitado: [nome]
                }
              },
              resposta
            );
          }
        } else {
          if (searchEstrela) {
            await EstrelaController.Update(
              {
                params: { nome: orbita },
                body: {
                  orbitada: [...searchEstrela.orbitado, nome]
                }
              },
              resposta
            );
          } else {
            await EstrelaController.Create(
              {
                body: {
                  nome: orbita,
                  sistema,
                  galaxia,
                  orbitada: [nome]
                }
              },
              resposta
            );
          }
        }

        if (searchEstrela) {
        }
        //FIM RELAÇÃO PLANETA - SATELITE - ESTRELA
        return res.status(200).send("Criado um novo Satelite!");
      })
      .catch(err => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(500).send("Esse Satelite já existe no banco!");
        }
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*2*/
  async Read(req, res) {
    const satelite = await Satelite.find().select({ __v: 0 });
    return res.status(200).json(satelite);
  },

  /*3*/
  async Update(req, res) {
    const { nome } = req.params;
    const info = req.body;
    await Satelite.findOneAndUpdate({ nome }, { $set: info })
      .then(async response => {
        let search = Satelite.findOne({ nome });
        if (info.nome && search.tipoOrbita === "planeta") {
          let planeta = Planeta.findOne({ nome: search.orbita });
          planeta.orbitado.splice(planeta.orbitado.indexOf(nome), 1);
          planeta.orbitado.push(info.nome);
          await PlanetaController.Update(
            {
              params: {
                nome: search.orbita
              },
              body: {
                orbitado: planeta.orbitado
              }
            },
            resposta
          );
        } else if (info.nome && search.tipoOrbita === "estrela") {
          let estrela = Estrela.findOne({ nome: search.orbita });
          estrela.orbitada.splice(estrela.orbitada.indexOf(nome), 1);
          estrela.orbitada.push(info.nome);
          await EstrelaController.Update(
            {
              params: {
                nome: search.orbita
              },
              body: {
                orbitada: estrela.orbitada
              }
            },
            resposta
          );
        }
        return res.status(200).send("Satelite atualizada!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  },
  /*4*/
  async Delete(req, res) {
    const { nome } = req.params;
    let search = Satelite.findOne({ nome });
    await Satelite.findOneAndDelete({ nome })
      .then(async response => {
        let findPlaneta = await Planeta.findOne({ nome: search.orbita });
        let findEstrela = await Estrela.findOne({ nome: search.orbita });
        if (search.tipoOrbita === "planeta") {
          findPlaneta.orbitado.splice(findPlaneta.orbitado.indexOf(nome), 1);
          await PlanetaController.Update(
            {
              params: {
                nome: search.orbita
              },
              body: {
                orbitado: findPlaneta.orbitado
              }
            },
            resposta
          );
        } else {
          findEstrela.orbitada.splice(findEstrela.orbitada.indexOf(nome), 1);
          await EstrelaController.Update(
            {
              params: { nome: search.orbita },
              body: {
                orbitada: findEstrela.orbitada
              }
            },
            resposta
          );
        }
        return res.status(200).send("Satelite deletado!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  }
};
