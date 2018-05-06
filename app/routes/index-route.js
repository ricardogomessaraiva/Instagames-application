var indexController = require('../controllers/index');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('../views/index/login', errors = {});
    });

    app.post('/', function (req, res) {        
        indexController.find(req, res);
    });

};