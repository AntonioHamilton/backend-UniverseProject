const Planeta = require('../models/Planeta');

module.exports = {
/*1*/
    async Create (req, res) {
        const { nome , tamanho, massa, gravidade, composicao } = req.body;
        await Planeta.create({
            nome, tamanho, massa, gravidade, composicao
        }).then( response => {
            return res.status(200).send('Criado um novo item no Planeta!');
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
        const planeta = await Planeta.find().select({"__v":0});
        return res.status(200).json(planeta);
    },

/*3*/
    async Update (req, res) {
        const { nome } = req.params;
        const info = req.body;
        await Planeta.findOneAndUpdate({nome}, {$set:info})
        .then( response => {
            req.io.emit('Planeta', response);
            return res.status(200).send('Planeta atualizada!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*4*/
    async Delete (req, res) {
        const { nome } = req.params;
        await Planeta.findOneAndDelete({ nome })
        .then( response => {
            return res.status(200).send('Usuário deletado!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    }
}