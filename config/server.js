const PORT = process.env.PORT || 5000;

module.exports = function () {
    var express = require('express'),
        busboy = require('connect-busboy'),
        Busboy = require('busboy'),
        app = express(),
        bodyParser = require('body-parser'),
        expressValidator = require('express-validator'),
        session = require('express-session'),
        busboyBodyParser = require('busboy-body-parser');

    //public vars
    global.CONFIG = require('config');
    global.URL_API = process.env.NODE_ENV == 'production' ? CONFIG.get('Config.production.url_api') : CONFIG.get('Config.development.url_api');
    console.log(URL_API);

    app.set('view engine', 'ejs');
    app.set('views', './app/views/');
    app.use(express.static('./app/public'));

    //Middlewares    
    app.use(expressValidator());

    app.use(busboy());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(busboyBodyParser());


    app.use(session({
        secret: 'app games',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));
    //End

    require('../app/routes/index-route')(app);
    require('../app/routes/home-route')(app);
    require('../app/routes/account-route')(app);
    require('../app/routes/publish-route')(app);
    require('../app/routes/about-route')(app);

    app.listen(PORT);
    console.log("Application server is up on port " + PORT + " at " + Date());

};