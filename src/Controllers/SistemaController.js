const Sistema = require('../models/Sistema');

module.exports = {
/*1*/
    async Create (req, res) {
        const { nome , quantidade_planetas, quantidade_estrelas, idade, url_imagem } = req.body;
        await Sistema.create({
            nome, quantidade_planetas, quantidade_estrelas, idade, url_imagem
        }).then( response => {
            return res.status(200).send('Criado um novo Sistema!');
        }).catch( err => {
            console.log(err);
            if (err.code === 11000) {
                return res.status(500).send('Esse Sistema já existe no banco!');
            }
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*2*/
    async Read (req, res) {
        const sistema = await Sistema.find().select({"__v":0});
        return res.status(200).json(sistema);
    },

/*3*/
    async Update (req, res) {
        const { nome } = req.params;
        const info = req.body;
        await Sistema.findOneAndUpdate({nome}, {$set:info})
        .then( response => {
            req.io.emit('Sistema', response);
            return res.status(200).send('Sistema atualizada!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*4*/
    async Delete (req, res) {
        const { nome } = req.params;
        await Sistema.findOneAndDelete({ nome })
        .then( response => {
            return res.status(200).send('Sistema deletado!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    }
}