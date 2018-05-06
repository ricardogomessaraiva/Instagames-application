
module.exports.find = function (req, res) {
    req.assert('username', 'Preencha o usuário').notEmpty();
    req.assert('password', 'Preencha a senha').notEmpty();

    var validations = req.validationErrors();

    if (validations) {
        res.render('index/login', { errors: validations });
        return;
    }
    
    var request = require('request');
    request({
        url: URL_API + 'api/user',
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: req.body,
        json: true
    }, function (error, resp) {
        if (error) {
            console.log('erro')
            res.render('index/login', { errors: [{ msg: 'Falha ao validar o usuário: ' + error }] });
            return;
        }

        if (resp.statusCode == 500) {

            res.render('index/login', { errors: [{ msg: 'Falha ao validar o usuário: ' + resp.body.message }] });
            return;
        }

        if (resp.statusCode == 404) {
            res.render('index/login', { errors: [{ msg: resp.body.message }] });
            return;
        }

        req.session.name = resp.body.user.name;
        req.session.username = resp.body.user.username;

        console.log('Validado - Direcionado para pagina Home');
        res.redirect("/home");
    });
};