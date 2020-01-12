const AnaVermelha = require('../models/AnaVermelha');

module.exports = {
    /*1*/
    async Create(req, res) {
        const { url_imagem, nome, tamanho, massa } = req.body;
        await AnaVermelha.create({
            nome, tamanho, massa, url_imagem
        }).then(response => {
            return res.status(200).send('Criado uma nova Anã Vermelha!');
        }).catch(err => {
            console.log(err);
            if (err.code === 11000) {
                return res.status(500).send('Essa Anã Vermelha já existe no banco!');
            }
            return res.status(500).send('Erro interno do servidor!');
        })
    },
    /*2*/
    async Read(req, res) {
        const anaVermelha = await AnaVermelha.find().select({ "__v": 0 });
        return res.status(200).json(anaVermelha);
    },

    /*3*/
    async Update(req, res) {
        const { nome } = req.params;
        const info = req.body;
        await AnaVermelha.findOneAndUpdate({ nome }, { $set: info })
            .then(response => {
                req.io.emit('AnaVermelha', response);
                return res.status(200).send('Anã Vermelha atualizada!');
            }).catch(err => {
                console.log(err);
                return res.status(500).send('Erro interno do servidor!');
            })
    },
    /*4*/
    async Delete(req, res) {
        const { nome } = req.params;
        await AnaVermelha.findOneAndDelete({ nome })
            .then(response => {
                return res.status(200).send('Anã Vermelha deletada!');
            }).catch(err => {
                console.log(err);
                return res.status(500).send('Erro interno do servidor!');
            })
    }
}