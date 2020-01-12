const AnaBranca = require('../models/AnaBranca');

module.exports = {
    /*1*/
    async Create(req, res) {
        const { url_imagem, nome, tamanho, massa } = req.body;
        await AnaBranca.create({
            nome, tamanho, massa, url_imagem
        }).then(response => {
            return res.status(200).send('Criado uma nova Anã Branca!');
        }).catch(err => {
            console.log(err);
            if (err.code === 11000) {
                return res.status(500).send('Essa Anã Branca já existe no banco!');
            }
            return res.status(500).send('Erro interno do servidor!');
        })
    },
    /*2*/
    async Read(req, res) {
        const anaBranca = await AnaBranca.find().select({ "__v": 0 });
        return res.status(200).json(anaBranca);
    },

    /*3*/
    async Update(req, res) {
        const { nome } = req.params;
        const info = req.body;
        await AnaBranca.findOneAndUpdate({ nome }, { $set: info })
            .then(response => {
                req.io.emit('AnaBranca', response);
                return res.status(200).send('Anã Branca atualizada!');
            }).catch(err => {
                console.log(err);
                return res.status(500).send('Erro interno do servidor!');
            })
    },
    /*4*/
    async Delete(req, res) {
        const { nome } = req.params;
        await AnaBranca.findOneAndDelete({ nome })
            .then(response => {
                return res.status(200).send('Anã Branca deletado!');
            }).catch(err => {
                console.log(err);
                return res.status(500).send('Erro interno do servidor!');
            })
    }
}