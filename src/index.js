const express = require ('express');
const cors = require ('cors');
const BDconnection = require('./config/BDconnection');
const bodyParser = require('body-parser');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

BDconnection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(cors({
    origin: 'http://localhost:3000/login'
}));

app.use ((req, res, next) => {
    req.io = io;
    next();
})

app.use(require('./routes/UserRoutes.js'));
app.use(require('./routes/authRoutes.js')(express));

server.listen(process.env.PORT || 8080);
