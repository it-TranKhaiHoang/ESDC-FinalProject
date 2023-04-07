const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const port = process.env.PORT || 8080;
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const database = require('./config/db');
const router = require('./resources/routers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('ESDC'));
app.use(session());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
    }),
);

database.connect();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Router
app.use('/', router);

app.listen(port, () => console.log('Server started in http://localhost:8080'));
