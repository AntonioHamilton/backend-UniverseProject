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

app.use(cors());

app.use ((req, res, next) => {
    req.io = io;
    next();
})

app.use(require('./routes/UserRoutes.js'));
app.use(require('./routes/galaxiaRoutes.js'));
app.use(require('./routes/AnaBrancaRoutes.js'));
app.use(require('./routes/AnaVermelhaRoutes.js'));
app.use(require('./routes/EstrelaRoutes.js'));
app.use(require('./routes/EstrelaBinariaRoutes.js'));
app.use(require('./routes/GiganteAzulRoutes.js'));
app.use(require('./routes/GiganteVermelhaRoutes.js'));
app.use(require('./routes/PlanetaRoutes.js'));
app.use(require('./routes/SateliteRoutes.js'));
app.use(require('./routes/SistemaRoutes.js'));
app.use(require('./routes/SateliteRoutes.js'));
app.use(require('./routes/authRoutes.js')(express));


server.listen(process.env.PORT || 8080);
console.log(`Server Started on PORT ${process.env.PORT}`)
