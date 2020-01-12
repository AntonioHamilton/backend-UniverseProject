const GiganteVermelha = require('../models/GiganteVermelha');

module.exports = {
/*1*/
    async Create (req, res) {
        const { nome , tamanho, massa } = req.body;
        await GiganteVermelha.create({
            nome, tamanho, massa
        }).then( response => {
            return res.status(200).send('Criado uma nova Gigante Vermelha!');
        }).catch( err => {
            console.log(err);
            if (err.code === 11000) {
                return res.status(500).send('Essa Gigante Vermelha já existe no banco!');
            }
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*2*/
    async Read (req, res) {
        const giganteVermelha = await GiganteVermelha.find().select({"__v":0});
        return res.status(200).json(giganteVermelha);
    },

/*3*/
    async Update (req, res) {
        const { nome } = req.params;
        const info = req.body;
        await GiganteVermelha.findOneAndUpdate({nome}, {$set:info})
        .then( response => {
            req.io.emit('GiganteVermelha', response);
            return res.status(200).send('Gigante Vermelha atualizada!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*4*/
    async Delete (req, res) {
        const { nome } = req.params;
        await GiganteVermelha.findOneAndDelete({ nome })
        .then( response => {
            return res.status(200).send('Gigante Vermelha deletado!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    }
}