const PORT = process.env.PORT || 5000;

module.exports = function () {
    var express = require('express'),
        eb = require('express-busboy'),
        app = express(),
        expressValidator = require('express-validator'),
        session = require('express-session');

    //public vars
    global.CONFIG = require('config');
    global.URL_API = process.env.NODE_ENV == 'development' ? CONFIG.get('Config.development.url_api') : CONFIG.get('Config.production.url_api');

    app.set('view engine', 'ejs');
    app.set('views', './app/views/');
    app.use(express.static('./app/public'));

    //Middlewares    
    app.use(expressValidator());

    var path = require('path');
    var appDir = path.dirname(require.main.filename);

    eb.extend(app, {
        upload: true,
        path: '/tmp',
        allowedPath: appDir + '/publish'
        // allowedPath: '/publish'
    });

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