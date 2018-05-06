
module.exports.find = function (req, res) {
    req.assert('username', 'Preencha o usuário').notEmpty();
    req.assert('password', 'Preencha a senha').notEmpty();

    var validations = req.validationErrors();

    if (validations) {
        res.render('index/login', { errors: validations });
        return;
    }

    console.log('Acionando API POST url --> ' + URL_API + 'api/user');

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
            res.render('index/login', { errors: [{ msg: 'Falha: ' + error }] });
            return;
        }

        if (resp.statusCode != 200) {            
            res.render('index/login', { errors: [{ msg: 'Falha ao validar o usuário: ' + resp.body.message }] });
            return;
        }

        console.log(resp.body);
        req.session.name = resp.body.user.name;
        req.session.username = resp.body.user.username;

        console.log('Validado - Direcionado para pagina Home');
        res.redirect("/home");
    });
};