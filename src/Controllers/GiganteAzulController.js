const GiganteAzul = require('../models/GiganteAzul');

module.exports = {
/*1*/
    async Create (req, res) {
        const { nome , tamanho, massa } = req.body;
        await GiganteAzul.create({
            nome, tamanho, massa
        }).then( response => {
            return res.status(200).send('Criado uma nova Gigante Azul!');
        }).catch( err => {
            console.log(err);
            if (err.code === 11000) {
                return res.status(500).send('Essa Gigante Azul já existe no banco!');
            }
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*2*/
    async Read (req, res) {
        const giganteAzul = await GiganteAzul.find().select({"__v":0});
        return res.status(200).json(giganteAzul);
    },

/*3*/
    async Update (req, res) {
        const { nome } = req.params;
        const info = req.body;
        await GiganteAzul.findOneAndUpdate({nome}, {$set:info})
        .then( response => {
            req.io.emit('GiganteAzul', response);
            return res.status(200).send('Gigante Azul atualizada!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*4*/
    async Delete (req, res) {
        const { nome } = req.params;
        await GiganteAzul.findOneAndDelete({ nome })
        .then( response => {
            return res.status(200).send('Gigante Azul deletada!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    }
}