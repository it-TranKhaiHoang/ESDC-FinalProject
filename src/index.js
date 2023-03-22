const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const port = process.env.PORT || 8080;
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const flash = require('express-flash');
const cookieParser  = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser("tkh"));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname,"resources/views"));

// Router


app.listen(port, () => console.log('Server started in http://localhost:8080'));