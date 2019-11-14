const User = require('../models/User');

module.exports = {
    async create (req, res) {
        const { name, login, password, email } = req.body;
        await User.create ({
            name,
            login,
            password,
            email
        }).then((user) => {
            req.io.emit('user', user);
            return res.status(200).send('Usuário criado!');
        }).catch((err)=>{
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
    async read (req, res) {
        const users = await User.find().sort('-createdAt').select({"password":0, "_id":0, "__v":0});

        return res.json(users);
    },
    async findOne (req, res) {
        const {login} = req.params;
        await User.findOne({login}).select({"password":0, "_id":0, "__v":0})
        .then((user)=>{
            return res.status(200).json(user);
        }).catch((err)=>{
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
        return res.status(404).send('Usuário não encontrado!');
    },
    async Update (req, res) {
        const { login } = req.params;
        const info = req.body;
        await User.findOneAndUpdate({ login }, {$set: info})
        .then((newUser)=>{
            req.io.emit('user', newUser);
            return res.status(200).send('Usuário atualizado!')
        }).catch((err)=>{
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    },
    async Delete (req, res) {
        const { login } = req.params;
        await User.findOneAndDelete({login})
        .then((user)=>{
            return res.status(200).send('Usuário deletado!');
        }).catch((err)=>{
            console.log(err);
            return res.status(500).send('Erro interno do servidor!');
        })
    } 
}