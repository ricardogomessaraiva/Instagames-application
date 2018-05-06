var homeController = require('../controllers/home');

module.exports = function (app) {
    app.post('/home', function (req, res) {        
        res.render('../views/home/home');
    });

    app.get('/home', function (req, res) {
        homeController.checkSession(req, res);
        homeController.getPosts(req, res);
    });

    app.get('/home/deslogar', function (req, res) {
        console.log('Destruindo sessions');
        homeController.destroySessions(req, res);
    });

    app.post('/home/comment', function (req, res) {
        homeController.addComment(req, res);
    });

    app.post('/home/feedback', function (req, res) {                                
        homeController.feedback(req, res);
    });
}