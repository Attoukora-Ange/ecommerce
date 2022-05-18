require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport')
const morgan = require('morgan');
const core = require('cors');
const path = require('path');
const flash = require('express-flash');
const Route_Admin = require('./Controllers/admin/Route');
const Route_Client = require('./Controllers/client/Route');
const DATA_BASE = require('./Controllers/Mongodb/mongo');
const methodOveride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(core());
app.use(methodOveride('_method'))
app.use(session({
   secret:process.env.SECRET,
   resave: false,
   saveUninitialized: true,
}));
app.use(passport.session());
app.use(passport.initialize());
app.use(bodyParser.json());

app.use(express.static('Public'));
app.use('css', express.static('Public/css'));
app.use('images', express.static('Public/images'));
app.use('js', express.static('Public/js'));
app.use(flash());


app.use('/', Route_Client);
app.use('/admin', Route_Admin);
app.use((req, res) => res.send('<h1>Error: 404</h1><h1>Page not found</h1>'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('Server démaré au port ' + PORT));