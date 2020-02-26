const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res) => {
    try {
        req.body.login && req.body.password ? username = req.body.login : res.status(400).send("Username ou Password não colocados");
        
        const user = await User.findOne({login:username});

        if (!user) {return res.status(404).send('Usuário não encontrado!')};
        
        const auth = await user.authenticate(req.body.password);
        
        if(!auth) {return res.status(401).send('Senha inválida')}

        const {name, login, type} = user;

        const token = jwt.sign({
            name, login, type
        },"Un1v3rs3Pr0j3ct",{
            expiresIn: 60 * 60
        });

        console.log(token);

        return res.status(200).send({token, user});

    } catch (err) {
        console.log(err);
        return res.status(500).send("Erro no servidor ao autenticar");
    }
}

const isAuthenticate = async (req, res) => {
    try {
        const token = req.headers['authentication'];
        if (!token) { return res.status(400).send('Token não enviado') }
        const payload = jwt.verify(token, "Un1v3rs3Pr0j3ct");
        req.payload = payload;
        next();
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports = {
    authenticate,
    isAuthenticate
}