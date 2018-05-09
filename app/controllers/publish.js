
module.exports.checkSession = function (req, res) {
    var session = req.session;
    if (session.username == null) {
        console.log('Não está logado. Redirecionado para o login...');
        res.render('../views/index/login', { errors: [] });
        return;
    }

    res.render('../views/publish/publish', { user: session.name, errors: [], field: {} });

};

module.exports.save = function (req, res) {          
    if (req.files.img == null) {
        res.render('publish/publish', { user: req.session.name, errors: [{ msg: 'Selecione um arquivo...' }], field: req.body });
        return;
    }

    req.assert('title', 'Título é um campo obrigatório e deve conter de 4 à 50 carecteres.').len(4, 50);
    req.assert('description', 'Descrição é um campo obrigatório e deve conter de 4 à 800 carecteres.').len(4, 800);

    var validations = req.validationErrors();

    if (validations) {
        console.log('Erros encontrado:');
        console.log(validations);
        res.render('publish/publish', { user: req.session.name, errors: validations, field: req.body });
        return;
    }

    // var fs = require('fs');
    // var FormData = require('form-data');
    // var form = new FormData();

    // form.append('name', req.session.name);
    // form.append('username', req.session.username);
    // form.append('imageName', req.files.img.name);
    // form.append('buffer', req.files.img.data);
    // //form.append('file', fs.createReadStream('../images' + req.files.img.name));
    // console.log('ENVIANDO form-data PARA API ---------->');
    // console.log(form);    

    req.body.imageBuffer = req.files.img.data;
    req.body.imgName = req.files.img.name;
    req.body.username = req.session.username;
    req.body.name = req.session.name;
    console.log(req.body);
    var request = require('request');
    request({
        url: URL_API + 'api/posts',
        method: "POST",
        headers: {
            // 'Content-Type': 'multipart/form-data'
            'Content-Type': 'application/json'
        },
        body: req.body,
        json: true
    }, function (error, resp) {
        if (error) {
            res.render('publish/publish', { user: req.session.name, errors: [{ msg: error }], field: {} });
            return;
        }

        if (resp.statusCode > 299) {
            res.render('publish/publish', { user: req.session.name, errors: [{ msg: resp.message }], field: {} });
            return;
        }

        console.log('Publicação salva com sucesso! Usuário -> ' + req.session.name);
        res.redirect("/home");
    });



}

