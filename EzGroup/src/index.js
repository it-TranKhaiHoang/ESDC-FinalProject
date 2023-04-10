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
const md5 = require('md5');

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
        helpers: {
            getAvatar: (email, options) => {
                return `https://www.gravatar.com/avatar/${md5(email)}?s=200&r=pg&d=retro`;
            },
            inc: function (value, options) {
                return parseInt(value) + 1;
            },
        },
    }),
);

database.connect();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Router
app.use('/', router);

app.get('/login', (req, res) => {
    let error = req.flash('error') || '';
    let email = req.flash('email') || '';
    let password = req.flash('password') || '';
    res.render('pages/login', { layout: 'main', error, email, password });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get('/calendar', (req, res) => {
    res.render('pages/calendar', { layout: 'admin' });
});

app.get('/', (req, res) => {
    if (!req.session.email) return res.redirect('/login');
    return res.render('pages/index', {
        layout: 'admin',
        email: md5(req.session.email),
        fullname: req.session.fullname,
        position: req.session.position,
    });
});

app.listen(port, () => console.log('Server started in http://localhost:8080'));
