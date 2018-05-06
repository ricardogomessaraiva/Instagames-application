var newAccountController = require('../controllers/new');
module.exports = function (app) {
    app.get('/account', function (req, res) {
        res.render('../views/account/new', { errors: {}, field: {} });
    });

    app.post('/account', function (req, res) {
        newAccountController.save(req, res)
    });
};