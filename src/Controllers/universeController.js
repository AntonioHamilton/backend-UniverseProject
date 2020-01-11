const Universe = require('../models/Universe');

module.exports = {
/*1*/
    async Create (req, res) {
        const { nome, tipo, area, volume, massa, gravidade, temperatura, curiosidades, image, luas, galaxia } = req.body;
        await Universe.create({
            nome, tipo, area, volume, massa, gravidade, temperatura, curiosidades, image, luas, galaxia 
        }).then( response => {
            return res.status(200).send('Criado um novo item no Universo!');
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
        const universe = await Universe.find().select({"__v":0});
        return res.status(200).json(universe);
    },

    async FindByType (req, res) {
        await Universe.find({tipo: req.params.tipo}).then( response => {
            return res.status(200).json(response)
        }).catch( err => {
            console.log(err);
            return res.status(500).send("erro interno do servidor!");
        })
        
    },
/*3*/
    async Update (req, res) {
        const { nome } = req.params;
        const info = req.body;
        await Universe.findOneAndUpdate({nome}, {$set:info})
        .then( response => {
            req.io.emit('universe', response);
            return res.status(200).send('Universo atualizado!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*4*/
    async Delete (req, res) {
        const { nome } = req.params;
        await Universe.findOneAndDelete({ nome })
        .then( response => {
            return res.status(200).send('Usuário deletado!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    }
}