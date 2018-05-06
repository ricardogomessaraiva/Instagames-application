//var Users = require('../models/users');

module.exports.save = function (req, res) {
    console.log(req.body);
    req.assert('name', 'Nome é um campo obrigatório e deve conter de 4 à 50 carecteres.').len(4, 50);

    req.assert('username', 'Usuário é um campo obrigatório e deve conter de 4 à 15 carecteres.').len(4, 15);

    req.assert('password', 'Senha é um campo obrigatório e deve conter de 4 à 15 carecteres.').len(4, 15);

    req.assert('re_password', 'Confirmação da senha é um campo obrigatório e deve conter de 4 à 15 carecteres.').len(4, 15);

    req.assert('password', 'As senhas devem ser iguais.').equals(req.body.re_password);

    var validations = req.validationErrors();

    if (validations) {
        res.render('account/new', { errors: validations, field: req.body });
        return;
    }

    var request = require('request');
    request({
        url: URL_API + 'api/user/new',
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: req.body,
        json: true
    }, function (error, resp) {
        if (error) {
            return res.render('account/new', { errors: [{ msg: error }], field: {} });
        }

        if (resp.statusCode != 200) {
            return res.render('account/new', { errors: [{ msg: resp.body.message }], field: {} });
        }

        req.session.name = resp.body.user.name;
        req.session.username = resp.body.user.username;

        res.redirect('/home');

    });
};