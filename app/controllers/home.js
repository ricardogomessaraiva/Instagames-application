var request = require('request');

module.exports.checkSession = function (req, res) {
    var session = req.session;
    if (session.username == null) {
        console.log('Não está logado. Redirecionado para o login...');
        res.render('../views/index/login', { errors: {} });
        return;
    }
};

module.exports.destroySessions = function (req, res) {
    req.session.destroy();
    res.redirect('/');
};

module.exports.getPosts = function (req, res) {
    request({
        url: URL_API + 'api/posts',
        method: "GET",
        json: true,
    }, function (error, response) {
        if (error) {
            //adiconar erro HTML            
        }
        if (response.statusCode != 200) {

        }

        return res.render('../views/home/home', { URL_API: URL_API, posts: response.body.posts, user: req.session.name });
    });
};


module.exports.addComment = function (req, res) {
    var data = { id: req.body._id, comment: req.body.comment, author: req.session.name };
    console.log(data);

    request({
        url: URL_API + 'api/posts/comment',
        method: "PUT",
        json: true,
        body: data
    }, function (error, response) {
        if (response.statusCode != 201) {
            //Incluir erro no HTML
            res.json('Ops! Aconteceu o seguinte erro: ' + error);
            return;
        }

        res.redirect("/home");
    });
};

module.exports.feedback = function (req, res) {
    var data = { id: req.body._id, feedback: req.body.feedback };

    request({
        url: URL_API + 'api/posts/feedback',
        method: "PUT",
        json: true,
        body: data
    }, function (error, response) {
        if (response.statusCode != 201) {
            //Incluir erro no HTML
            res.json('Ops! Aconteceu o seguinte erro: ' + error);
            return;
        }

        res.redirect("/home");
    });
}