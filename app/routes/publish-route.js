var publishController = require('../controllers/publish');


module.exports = function (app) {
    app.get('/publish', function (req, res) {
        publishController.checkSession(req, res);
    });     

    app.post('/publish', function(req, res){    
        // console.log(req.files);

        // req.busboy.on('field', function(fieldname, val) {
        //     // console.log(fieldname, val);
        //     console.log(val);
        // });
    
        // return;                
        publishController.save(req, res);
    });
    
}