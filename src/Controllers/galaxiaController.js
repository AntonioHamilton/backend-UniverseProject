const Galaxia = require('../models/Galaxia');

module.exports = {
/*1*/
    async Create (req, res) {
        const { nome, quantidade_sistemas, distancia_terra } = req.body;
        await Universe.create({
            nome, quantidade_sistemas, distancia_terra
        }).then( response => {
            return res.status(200).send('Criado um novo item na Galaxia!');
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
        const galaxia = await Galaxia.find().select({"__v":0});
        return res.status(200).json(galaxia);
    },

/*3*/
    async Update (req, res) {
        const { nome } = req.params;
        const info = req.body;
        await Galaxia.findOneAndUpdate({nome}, {$set:info})
        .then( response => {
            req.io.emit('galaxia', response);
            return res.status(200).send('Galaxia atualizada!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*4*/
    async Delete (req, res) {
        const { nome } = req.params;
        await Galaxia.findOneAndDelete({ nome })
        .then( response => {
            return res.status(200).send('Usuário deletado!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    }
}