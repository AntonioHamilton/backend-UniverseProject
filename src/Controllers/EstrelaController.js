const Estrela = require('../models/Estrela');

module.exports = {
/*1*/
    async Create (req, res) {
        const { idade , distancia_terra, gravidade, url_imagem, id } = req.body;
        await Estrela.create({
            idade, distancia_terra, gravidade, url_imagem, id
        }).then( response => {
            return res.status(200).send('Criado uma nova Estrela!');
        }).catch( err => {
            console.log(err);
            if (err.code === 11000) {
                return res.status(500).send('Esse Estrela já existe no banco!');
            }
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*2*/
    async Read (req, res) {
        const estrela = await Estrela.find().select({"__v":0});
        return res.status(200).json(estrela);
    },

/*3*/
    async Update (req, res) {
        const { nome } = req.params;
        const info = req.body;
        await Estrela.findOneAndUpdate({nome}, {$set:info})
        .then( response => {
            req.io.emit('Estrela', response);
            return res.status(200).send('Estrela atualizada!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
/*4*/
    async Delete (req, res) {
        const { nome } = req.params;
        await Estrela.findOneAndDelete({ nome })
        .then( response => {
            return res.status(200).send('Estrela deletada!');
        }).catch( err => {
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    }
}