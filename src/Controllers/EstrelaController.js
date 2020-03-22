const Estrela = require("../models/Estrela");
const Sistema = require("../models/Sistema");
const Planeta = require("../models/Planeta");
const Satelite = require("../models/Satelite");
const SistemaController = require("../Controllers/SistemaController");
var resposta = { status: x => ({ send: x => console.log(x) }) };
module.exports = {
  /*1*/
  async Create(req, res) {
    let {
      nome,
      tamanho,
      idade,
      distancia_terra,
      gravidade,
      url_imagem,
      id,
      sistema,
      galaxia,
      orbitada,
      tipo
    } = req.body;
    if (!id) {
      const allStars = await Estrela.find();
      if (allStars.id !== undefined) {
        let idAnt = allStars[0].id;
        id = idAnt + "n20nPaçoca";
      } else {
        id = "n20nPaçoca";
      }
    }
    await Estrela.create({
      nome,
      tamanho,
      idade,
      distancia_terra,
      gravidade,
      url_imagem,
      id,
      sistema,
      orbitada,
      tipo
    })
      .then(async response => {
        //RELAÇÃO ESTRELA - SISTEMA
        let search = await Sistema.findOne({ nome: sistema });
        if (search) {
          search.estrelas = [...search.estrelas, nome];
          await Sistema.findOneAndUpdate(
            {
              nome: search.nome
            },
            {
              planetas: search.planetas,
              estrelas: search.estrelas,
              quantidade_estrelas: search.quantidade_estrelas.length
            }
          );
        } else {
          await SistemaController.Create(
            {
              body: {
                nome: sistema,
                estrelas: [nome],
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

    if (info.nome) {
      let estrela = await Estrela.findOne({ nome });
      //RELAÇÃO ESTRELA - SISTEMA
      let sistema = await Sistema.findOne({ nome: estrela.sistema });
      sistema.estrelas.splice(sistema.estrelas.indexOf(nome), 1);
      sistema.estrelas.push(info.nome);
      await SistemaController.Update(
        {
          params: { nome: estrela.sistema },
          body: {
            estrelas: sistema.estrelas
          }
        },
        resposta
      );
      //FIM RELAÇÃO ESTRELA - SISTEMA
      //RELAÇÃO ESTRELA - PLANETA - SATELITE
      estrela.orbitada.map(async item => {
        let planeta = Planeta.findOne({ nome: item });
        if (info.nome && planeta) {
          planeta.orbita.splice(planeta.orbita.indexOf(nome), 1);
          planeta.orbita.push(info.nome);
          await require("../Controllers/PlanetaController").Update(
            {
              params: { nome: item },
              body: {
                orbita: planeta.orbita
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
      //FIM RELAÇÃO ESTRELA - SISTEMA
    }

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
        let search = await Sistema.findOne({ nome: estrela.sistema });
        search.estrelas.splice(search.estrelas.indexOf(nome), 1);
        await SistemaController.Update(
          {
            params: { nome: estrela.sistema },
            body: {
              estrelas: search.estrelas,
              quantidade_estrelas: search.estrelas.length
            }
          },
          resposta
        );
        //FIM RELAÇÃO PLANETA - SISTEMA
        //RELAÇÃO PLANETA - ESTRELA - SATELITE
        orbitada.map(async item => {
          let search1 = await Planeta.findOne({ nome: item });
          let search2 = await Satelite.findOne({ nome: item });
          if (search1) {
            search1.orbita.splice(search1.orbita.indexOf(nome), 1);
            await require("../Controllers/PlanetaController").Update(
              {
                params: { nome: item },
                body: {
                  orbita: search1.orbita
                }
              },
              resposta
            );
          } else if (search2) {
            await require("../Controllers/SateliteController").Update(
              {
                params: { nome: item },
                body: {
                  orbita: "Desconhecida"
                }
              },
              resposta
            );
          }
        });
        //FIM RELAÇÃO PLANETA - ESTRELA - SATELITE
        return res.status(200).send("Estrela deletada!");
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send("Erro interno do servidor!");
      });
  }
};
