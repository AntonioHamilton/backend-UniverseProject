const Sistema = require("../models/Sistema");
const Galaxia = require("../models/Galaxia");
const Planeta = require("../models/Planeta");
const Estrela = require("../models/Estrela");
module.exports = {
  /*1*/
  async Create(req, res) {
    const {
      nome: nome_sistema,
      quantidade_planetas,
      quantidade_estrelas,
      idade,
      url_imagem,
      galaxia,
      planetas
    } = req.body;
    await Sistema.create({
      nome: nome_sistema,
      quantidade_planetas,
      quantidade_estrelas,
      idade,
      url_imagem,
      galaxia,
      planetas
    })
      .then(async response => {
        //RELAÇÃO SISTEMA - GALAXIA
        const search = await Galaxia.findOne({ nome: galaxia });
        if (search) {
          search.sistemas = [...search.sistemas, nome_sistema];
          search.quantidade_sistemas += 1;
          await Galaxia.findOneAndUpdate(
            {
              nome: search.nome
            },
            {
              sistemas: search.sistemas,
              quantidade_sistemas: search.quantidade_sistemas.length
            }
          );
        } else {
          await Galaxia.create({
            nome: galaxia,
            sistemas: [nome_sistema],
            quantidade_sistemas: 1
          });
        }
        //FIM RELAÇÃO SISTEMA - GALAXIA
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
    //RELAÇÃO GALAXIA - SISTEMA
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
    //FIM RELAÇÃO GALAXIA - SISTEMA
    //RELAÇÃO SISTEMA - PLANETA
    if (info.nome) {
      let sistema = await Sistema.findOne({ nome });
      sistema.planetas.map(async item => {
        await Planeta.findOneAndUpdate(
          { nome: item },
          { sistema: sistema.nome }
        );
      });
    }
    //FIM RELAÇÃO SISTEMA - PLANETA
    //RELAÇÃO SISTEMA - ESTRELA
    if (info.nome) {
      let sistema = await Sistema.findOne({ nome });
      sistema.estrelas.map(async item => {
        await Estrela.findOneAndUpdate(
          { nome: item },
          { sistema: sistema.nome }
        );
      });
    }
    //FIM RELAÇÃO SISTEMA - ESTRELA
    await Sistema.findOneAndUpdate({ nome }, { $set: info })
      .then(response => {
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
    //RELAÇÃO SISTEMA - GALAXIA
    const sistema = await Sistema.findOne({ nome });
    const search = await Galaxia.findOne({
      nome: sistema.galaxia
    });
    await Galaxia.findOneAndUpdate(
      { nome: sistema.galaxia },
      {
        sistemas: search.sistemas.splice(search.sistemas.indexOf(nome), 1),
        quantidade_sistemas: (search.quantidade_sistemas -= 1)
      }
    );
    //FIM RELAÇÃO SISTEMA - GALAXIA
    //RELAÇÃO PLANETA - SISTEMA
    sistema.planetas.map(async item => {
      await Planeta.findOneAndUpdate(
        { nome: item },
        {
          sistema: "Desconhecido"
        }
      );
    });
    //FIM RELAÇÃO PLANETA - SISTEMA
    //RELAÇÃO ESTRELA - SISTEMA
    sistema.estrelas.map(async item => {
      await Estrela.findOneAndUpdate(
        { nome: item },
        {
          sistema: "Desconhecido"
        }
      );
    });
    //FIM RELAÇÃO ESTRELA - SISTEMA
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
