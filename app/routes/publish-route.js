var publishController = require('../controllers/publish');


module.exports = function (app) {
    app.get('/publish', function (req, res) {
        publishController.checkSession(req, res);
    });     

    app.post('/publish', function(req, res){                   
        publishController.save(req, res);
    });
    
}