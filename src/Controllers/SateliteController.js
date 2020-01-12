const Satelite = require('../models/Satelite');

module.exports = {
/*1*/
    async Create (req, res) {
        const { nome , tamanho, massa, composicao } = req.body;
        await Satelite.create({
            nome, tamanho, massa, composicao
        }).then( response => {
            return res.status(200).send('Criado um novo item no Satelite!');
        }).catch( err => {
            console.log(err);
            if (err.code === 11000) {
                return res.status(500).send('Esse usuário já existe no banco!');
            }
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*2*/
    async Read (req, res) {
        const satelite = await Satelite.find().select({"__v":0});
        return res.status(200).json(satelite);
    },

/*3*/
    async Update (req, res) {
        const { nome } = req.params;
        const info = req.body;
        await Satelite.findOneAndUpdate({nome}, {$set:info})
        .then( response => {
            req.io.emit('Satelite', response);
            return res.status(200).send('Satelite atualizada!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*4*/
    async Delete (req, res) {
        const { nome } = req.params;
        await Satelite.findOneAndDelete({ nome })
        .then( response => {
            return res.status(200).send('Usuário deletado!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    }
}