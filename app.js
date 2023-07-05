// Imports
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { sequelize } = require('./database');
require('dotenv').config();
require('ejs');

const { conectarDB } = require('./database');

conectarDB()

const app = express();
const port = process.env.PORT || 5000

// Middlewares
// TODO: Implementar middlewares

app.use(cors());
//app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404

app.use((req, res, next) => {
    return res.status(404).render('404');

})

sequelize.sync({force:false})

// Starting the server
app.listen(port, () => console.log(`Server on port http://localhost:${port}`));